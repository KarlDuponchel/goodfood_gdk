'use client';

import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";
import burger1 from "../../../images/burger.jpg";
import burger2 from "../../../images/burger2.jpg";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { useEffect, useState } from "react";
import { getCoordinates, getItinary } from "@/services/Geolocate";
import { ClockIcon, MapIcon } from "@heroicons/react/24/outline";

export default function Page({
    params,
  }: {
    params: { slug: number };
  }) {

    const [map, setMap] = useState<mapboxgl.Map>();
    const [coordinates, setCoordinates] = useState<LngLatLike>([1, 50]);
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
          setCoordinates(data);
        })
      }
    }, [address])

    useEffect(() => {
      setMap(new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [2.3,48.8],
        zoom: 12,
        accessToken: "pk.eyJ1Ijoia2FybGR1cG9uY2hlbCIsImEiOiJjbGlicWp2dnUwZzVsM3JtdWZ0OWFxYndhIn0.smBViieSG9CHQiWNrBunAw",
      }))
    }, [coordinates])

    useEffect(() => {
      getItinary([1.093966,49.440459], [1.139173,49.41199]).then((data) => {
        const coords = {
          route: data.geometry.coordinates,
          distance: data.distance,
          duration: data.duration,
        }
        setRouteCoordinates(coords);
        map?.addSource('route', {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              'coordinates': coords.route,
            },
          },
        }) ;
      });
    }, [map])

    //Recup produit avec le numéro de commandes

    //Fausses infos
    const produits = [
      {
        id: 1,
        name: "Burger simple",
        price: 9,
        quantity: 1,
        image: burger1.src,
        idRestaurant: 1,
      },
      {
        id: 2,
        name: "Burger avec frites",
        price: 11,
        quantity: 2,
        image: burger2.src,
        idRestaurant: 1,
      },
    ]

    const getTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const secondesRestantes = (seconds % 60);
    
      const minutesFormattees = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const secondesFormattees = secondesRestantes < 10 ? `0${secondesRestantes}` : `${secondesRestantes}`;
    
      return `${minutesFormattees} minutes et ${secondesFormattees.substring(0, 2)} secondes`;
    }

    console.log(routeCoordinates);

    return (
        <>
            <Header />
              <div className="p-6 flex flex-col gap-8 min-h-screen">
                <div className='flex justify-between font-bold text-lg'>
                    <span>Suivi de votre <span className='text-primary'>commande n°{params.slug}</span></span>
                </div>
                <div className="w-full flex justify-center items-center">
                    <div className="w-7/12 flex bg-zinc-200 rounded-md shadow-lg">
                        <div className="w-1/2 flex flex-col border-r border-black">
                            <div className="w-full flex flex-col justify-center items-center gap-8 py-8 px-4 border-b border-black">
                                <span className="font-bold text-xl">Commande prise en charge par notre livreur</span>
                                <span className="w-4/6 h-5 rounded-full border border-black bg-white relative flex items-center">
                                  <span className="w-2/3 h-4 bg-black rounded-full absolute ml-0.5 text-white flex justify-end items-center font-bold pr-1">
                                    66.6%
                                  </span>
                                </span>
                            </div>
                            <div className="w-full h-96 relative" id="map" >
                                <div className="bg-zinc-200 absolute top-0 left-0 z-10 p-1 rounded-br-md flex gap-1 font-bold">
                                  <MapIcon className="w-5 h-5" />
                                  <span>{routeCoordinates && `${(routeCoordinates.distance / 1000).toFixed(2)}km`}</span>
                                </div>
                                <div className="bg-zinc-200 absolute top-0 right-0 z-10 p-1 rounded-bl-md flex gap-1 font-bold">
                                  <ClockIcon className="w-5 h-5" />
                                  <span>{routeCoordinates && getTime(routeCoordinates.duration)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 p-2 flex flex-col">
                            <div className="pt-6 pl-2 font-bold text-xl">
                                Détail de la <span className="text-primary">commande</span>
                            </div>
                            <div className="h-full pl-2 pt-6 flex flex-col gap-2">
                                {produits.map((product, key) => {
                                  return (
                                    <div key={key} className="w-4/6 border-b border-black flex">
                                      <div className="w-1/3 mb-2">
                                        <img src={product.image} alt={product.name} className="w-full h-24 object-cover" />
                                      </div>
                                      <div className="pl-2 flex flex-col w-2/3">
                                        <span className="font-black text-base">{"Nom restaurant"}</span>
                                        <ul className="pl-8 list-disc">
                                          <li>{product.name}</li>
                                        </ul>
                                        <span className="w-full h-full flex justify-end items-end text-primary font-black text-lg">{product.price}€</span>
                                      </div>
                                    </div>
                                  )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            <Footer />
        </>
    )
}