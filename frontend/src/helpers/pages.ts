import { LazyExoticComponent } from "react";
import { EstadisticasPage } from "../pages/EstadisticasPage";
import { LogsPage } from "../pages/LogsPage";
import { SubscribersGoPage } from "../pages/SubscribersGoPage";
import { Top10JugadoresPage } from "../pages/Top10JugadoresPage";
import { Top3JuegosPage } from "../pages/Top3JuegosPage";
import { Ultimos10JuegosPage } from "../pages/Ultimos10JuegosPage";
type JSXComponent = () => JSX.Element

interface Route {
    path: string;
    component: LazyExoticComponent<JSXComponent> | JSXComponent; //() => JSX.Element;
    name: string;
    children?: Route[];
}

export const routes: Route[] = [
    {
        path: '/',
        component: LogsPage,
        name: 'Logs'
    },
    {
        path: '/top3juegos',
        component: Top3JuegosPage,
        name: 'Top 3 juegos'
    },
    {
        path: '/subcribers',
        component: SubscribersGoPage,
        name: 'Subscriber'
    },
    {
        path: '/top10jugadores',
        component: Top10JugadoresPage,
        name: 'Top 10 jugadores'
    },
    {
        path: '/ultimos10juegos',
        component: Ultimos10JuegosPage,
        name: 'Ultimos 10 juegos'
    },

    {
        path: '/estadisticas',
        component: EstadisticasPage,
        name: 'Estadisticas tiempo real'
    },
]