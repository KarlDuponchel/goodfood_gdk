"use client";

import { FunctionComponent, useEffect, useState } from "react";
import { BaseButton } from "@/components/button/Button";
import { Progress } from "@/components/ui/progress";
import { CommandProduct } from "@/containers/commands/CommandProduct";
import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";
import { useFetchOrderById } from "@/hooks/order/use_fetch_order_by_id";
import { useFetchRestaurantById } from "@/hooks/restaurants/use_fetch_restaurant_by_id";
import { getCoordinates, getItinary } from "@/services/Geolocate";
import { convertDateToFr } from "@/utils/function";
import { Restaurant } from "@/utils/types";
import { ClockIcon, MapIcon } from "@heroicons/react/24/outline";
import mapboxgl from "mapbox-gl";

type CommandDetailPageProps = {
  commandId: number;
};

export const CommandDetailPage: FunctionComponent<CommandDetailPageProps> = ({
  commandId,
}) => {
  const command = useFetchOrderById(commandId);
  const restaurant = useFetchRestaurantById(
    command.data && command.data.idRestaurant ? command.data.idRestaurant : -1,
  );

  //Coordonnées du restaurant
  //A recup via l'api
  const [coordsRestau, setCoordsRestau] = useState<any>([0, 0]);

  const [map, setMap] = useState<mapboxgl.Map>();
  const [userCoordinates, setUserCoordinates] = useState<any>([1, 50]);
  const [address, setAddress] = useState<string>("");
  const [routeCoordinates, setRouteCoordinates] = useState<{
    route: any[];
    distance: number;
    duration: number;
  }>();

  console.log(command.data);

  const getRestaurantCoords = (restaurant: Restaurant) => {
    const address = `${restaurant.address}, ${restaurant.zip_code} ${restaurant.city}, ${restaurant.country}`;

    getCoordinates(address).then((data) => {
      setCoordsRestau(data);
    });
  };

  useEffect(() => {
    if (localStorage.getItem("address")) {
      setAddress(localStorage.getItem("address") as string);
    }
  }, []);

  useEffect(() => {
    if (!restaurant.data) return;

    getRestaurantCoords(restaurant.data);
  }, [restaurant.data, map]);

  useEffect(() => {
    if (address) {
      getCoordinates(address).then((data) => {
        setUserCoordinates(data);
      });
    }
  }, [address]);

  useEffect(() => {
    setMap(
      new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: userCoordinates,
        zoom: 10.5,
        accessToken: process.env.mapbox_token,
      }),
    );
  }, [userCoordinates]);

  useEffect(() => {
    if (!map) return;
    getItinary(coordsRestau, userCoordinates).then((data) => {
      const coords = {
        route: data.geometry.coordinates,
        distance: data.distance,
        duration: data.duration,
      };
      console.log(data);
      setRouteCoordinates(coords);

      if (address) {
        map.on("load", function () {
          map.addLayer({
            id: "startPoint",
            type: "circle",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {},
                    geometry: {
                      type: "Point",
                      coordinates: coordsRestau,
                    },
                  },
                ],
              },
            },
            paint: {
              "circle-radius": 7,
              "circle-color": "#000",
            },
          });
          map.addLayer({
            id: "endPoint",
            type: "circle",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {},
                    geometry: {
                      type: "Point",
                      coordinates: userCoordinates,
                    },
                  },
                ],
              },
            },
            paint: {
              "circle-radius": 7,
              "circle-color": "#000",
            },
          });
        });

        const source: mapboxgl.GeoJSONSource = map.getSource(
          "route",
        ) as mapboxgl.GeoJSONSource;

        if (source) {
          source.setData({
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords.route,
            },
          });
        } else {
          map.on("load", function () {
            map.addLayer({
              id: "route",
              type: "line",
              source: {
                type: "geojson",
                data: {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates: coords.route,
                  },
                },
              },
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": "#14BAF4",
                "line-width": 5,
                "line-opacity": 0.75,
              },
            });
          });
        }
      }
    });
  }, [map, userCoordinates, address, coordsRestau]);

  const getTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondesRestantes = seconds % 60;

    const minutesFormattees = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondesFormattees =
      secondesRestantes < 10 ? `0${secondesRestantes}` : `${secondesRestantes}`;

    return `${minutesFormattees} minutes et ${secondesFormattees.substring(
      0,
      2,
    )} secondes`;
  };

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
  };

  return (
    <>
      <Header />
      <link
        rel="stylesheet"
        href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css"
      />
      <div className="flex min-h-screen flex-col gap-8 p-6">
        <div className="flex justify-between text-lg font-bold">
          <span>
            Suivi de votre{" "}
            <span className="text-primary">commande n°{commandId}</span>
          </span>
        </div>
        <div className="flex w-full items-center justify-center">
          <div className="flex w-7/12 rounded-md bg-zinc-200 shadow-lg max-xl:w-8/12 max-xl:flex-col max-lg:w-10/12">
            <div className="flex w-1/2 flex-col border-r border-black max-xl:w-full max-xl:border-r-0">
              <div className="flex w-full flex-col items-center justify-center gap-8 border-b border-black px-4 py-8">
                <span className="text-xl font-bold">Etat</span>
                <Progress className="w-5/6 border border-zinc-400" value={50} />
              </div>
              <div
                className="relative h-[420px] w-full max-xl:border-b max-xl:border-black"
                id="map"
              >
                <div className="absolute left-0 top-0 z-[5] flex gap-1 rounded-br-md bg-zinc-200 p-1 font-bold">
                  <MapIcon className="h-5 w-5" />
                  <span>
                    {routeCoordinates &&
                      `${(routeCoordinates.distance / 1000).toFixed(2)}km`}
                  </span>
                </div>
                <div className="absolute right-0 top-0 z-[5] flex gap-1 rounded-bl-md bg-zinc-200 p-1 font-bold">
                  <ClockIcon className="h-5 w-5" />
                  <span>
                    {routeCoordinates && getTime(routeCoordinates.duration)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-1/2 flex-col p-4 max-xl:w-full">
              <div className="pt-4 text-xl font-bold">
                Détail de la commande du{" "}
                <span className="text-primary">
                  {convertDateToFr(
                    command && command.data?.createdAt
                      ? command.data?.createdAt
                      : "",
                  )}
                </span>
              </div>
              <div className="flex h-full flex-col gap-2 pt-4">
                {command.data &&
                  command.data.orderContents.map((product) => {
                    console.log(command.data);
                    return (
                      <CommandProduct
                        key={product.id}
                        id={product.idContent}
                        quantity={product.quantity}
                        nameRestaurant={
                          restaurant.data && restaurant.data.name
                            ? restaurant.data.name
                            : ""
                        }
                      />
                    );
                  })}
                <div className="flex w-4/6 justify-between max-2xl:w-full">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-lg font-bold text-primary">
                    {getTotalPrice()}
                  </span>
                </div>
                <div className="flex h-full w-full items-end justify-end">
                  <BaseButton label="Un problème ?" variant="primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
