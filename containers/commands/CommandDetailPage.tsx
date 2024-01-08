'use client';

import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";
import mapboxgl from "mapbox-gl";
import { FunctionComponent, useEffect, useState } from "react";
import { getCoordinates, getItinary } from "@/services/Geolocate";
import { ClockIcon, MapIcon } from "@heroicons/react/24/outline";
import { BaseButton } from "@/components/button/Button";
import { Progress } from "@/components/ui/progress";
import { useFetchOrderById } from "@/hooks/order/use_fetch_order_by_id";
import { useFetchRestaurantById } from "@/hooks/restaurants/use_fetch_restaurant_by_id";
import { convertDateToFr } from "@/utils/function";

type CommandDetailPageProps = {
    commandId: number
}

export const CommandDetailPage: FunctionComponent<CommandDetailPageProps> = ({
    commandId
}) => {
    
    const command = useFetchOrderById(commandId)
    const restaurant = useFetchRestaurantById(command.data && command.data.idRestaurant ? command.data.idRestaurant : -1)

    console.log(command.data)
  
      //Coordonnées du restaurant
      //A recup via l'api
      const [coordsRestau, setCoordsRestau] = useState<any>([1.09557,49.44311]);
  
      const [map, setMap] = useState<mapboxgl.Map>();
      const [userCoordinates, setUserCoordinates] = useState<any>([1, 50]);
      const [address, setAddress] = useState<string>("");
      const [routeCoordinates, setRouteCoordinates] = useState<{
        route: any[],
        distance: number,
        duration: number,
      }>();
  
      useEffect(() => {
        if (localStorage.getItem("address")) {
          setAddress(localStorage.getItem("address") as string);
        }
      }, [])
  
      useEffect(() => {
        if (address) {
          getCoordinates(address).then((data) => {
            setUserCoordinates(data);
          })
        }
      }, [address])
  
      useEffect(() => {
        setMap(new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [1.099971,49.443232],
          zoom: 12.5,
          accessToken: process.env.mapbox_token,
        }))
      }, [userCoordinates])
  
      useEffect(() => {
        if (!map) return;
        getItinary(coordsRestau, userCoordinates).then((data) => {
          const coords = {
            route: data.geometry.coordinates,
            distance: data.distance,
            duration: data.duration,
          }
          setRouteCoordinates(coords);
  
          if (address) {
            map.on('load', function () {
              map.addLayer({
                id: 'startPoint',
                type: 'circle',
                source: {
                  type: 'geojson',
                  data: {
                    type: 'FeatureCollection',
                    features: [
                      {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                          type: 'Point',
                          coordinates: coordsRestau
                        }
                      }
                    ]
                  }
                },
                paint: {
                  'circle-radius': 7,
                  'circle-color': '#000'
                }
              });
              map.addLayer({
                id: 'endPoint',
                type: 'circle',
                source: {
                  type: 'geojson',
                  data: {
                    type: 'FeatureCollection',
                    features: [
                      {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                          type: 'Point',
                          coordinates: userCoordinates
                        }
                      }
                    ]
                  }
                },
                paint: {
                  'circle-radius': 7,
                  'circle-color': '#000'
                }
              })
            });
    
            const source: mapboxgl.GeoJSONSource = map.getSource('route') as mapboxgl.GeoJSONSource;
    
            if (source) {
              source.setData({
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: coords.route,
                },
              });
            } else {
              map.on('load', function () {
                map.addLayer({
                  id: 'route',
                  type: 'line',
                  source: {
                    type: 'geojson',
                    data: {
                      type: 'Feature',
                      properties: {},
                      geometry: {
                        type: 'LineString',
                        coordinates: coords.route,
                      }
                    }
                  },
                  layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                  },
                  paint: {
                    'line-color': '#14BAF4',
                    'line-width': 5,
                    'line-opacity': 0.75
                  }
                })
              });
            } 
          }
        });
      }, [map, userCoordinates, address, coordsRestau])
  
      const getTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secondesRestantes = (seconds % 60);
      
        const minutesFormattees = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const secondesFormattees = secondesRestantes < 10 ? `0${secondesRestantes}` : `${secondesRestantes}`;
      
        return `${minutesFormattees} minutes et ${secondesFormattees.substring(0, 2)} secondes`;
      }
  
      /**
       * Permet de calculer le prix total
       * @returns number
       */
      const getTotalPrice = () => {
        if (!command || !command.data) return;
        const contents = command.data.orderContents;

        let total = 0;
        for (let i = 0; i < contents.length; i++) {
            total += contents[i].quantity * contents[i].price;
        }
        return total.toFixed(2);
    }

    return (
        <>
            <Header />
              <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" />
              <div className="p-6 flex flex-col gap-8 min-h-screen">
                <div className='flex justify-between font-bold text-lg'>
                    <span>Suivi de votre <span className='text-primary'>commande n°{commandId}</span></span>
                </div>
                <div className="w-full flex justify-center items-center">
                    <div className="w-7/12 flex bg-zinc-200 rounded-md shadow-lg max-xl:flex-col max-xl:w-8/12 max-lg:w-10/12">
                        <div className="w-1/2 flex flex-col border-r border-black max-xl:w-full max-xl:border-r-0">
                            <div className="w-full flex flex-col justify-center items-center gap-8 py-8 px-4 border-b border-black">
                                <span className="font-bold text-xl">Etat</span>
                                <Progress className="border border-zinc-400 w-5/6" value={50}/>
                            </div>
                            <div className="w-full h-[420px] relative max-xl:border-b max-xl:border-black" id="map" >
                                <div className="bg-zinc-200 absolute top-0 left-0 z-[5] p-1 rounded-br-md flex gap-1 font-bold">
                                  <MapIcon className="w-5 h-5" />
                                  <span>{routeCoordinates && `${(routeCoordinates.distance / 1000).toFixed(2)}km`}</span>
                                </div>
                                <div className="bg-zinc-200 absolute top-0 right-0 z-[5] p-1 rounded-bl-md flex gap-1 font-bold">
                                  <ClockIcon className="w-5 h-5" />
                                  <span>{routeCoordinates && getTime(routeCoordinates.duration)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 p-4 flex flex-col max-xl:w-full">
                            <div className="pt-4 font-bold text-xl">
                                Détail de la commande du <span className="text-primary">{convertDateToFr(command && command.data?.createdAt ? command.data?.createdAt : "")}</span>
                            </div>
                            <div className="h-full pt-4 flex flex-col gap-2">
                                {command.data && command.data.orderContents.map((product, key) => {
                                  return (
                                    <div key={key} className="w-4/6 border-b border-black flex max-2xl:w-full">
                                      <div className="w-1/3 mb-2">
                                        <img src={product.contentName} alt={product.contentName} className="w-full h-24 object-cover" />
                                      </div>
                                      <div className="pl-2 flex flex-col w-2/3">
                                        <span className="font-black text-base">{restaurant.data?.name}</span>
                                        <ul className="pl-8 list-disc">
                                          <li>{product.contentName}</li>
                                        </ul>
                                        <span className="w-full h-full flex justify-end items-end text-primary font-black text-lg">{product.price}€</span>
                                      </div>
                                    </div>
                                  )
                                })}
                                <div className="w-4/6 flex justify-between max-2xl:w-full">
                                  <span className="font-bold text-xl">Total</span>
                                  <span className="font-bold text-primary text-lg">{getTotalPrice()}</span>
                                </div>
                                <div className="h-full w-full flex justify-end items-end">
                                    <BaseButton label="Un problème ?" variant="primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            <Footer />
        </>
    )
}