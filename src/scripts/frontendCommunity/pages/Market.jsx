import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import PostsList from "../components/PostsList";
import { faArrowRightToBracket, faCheck, faEllipsis, faPenToSquare, faTrashCan, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicroblog } from "@fortawesome/free-brands-svg-icons";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// import { formatDate } from "../utils/formatters";
import { PuffLoader } from 'react-spinners';
import "../styles/Market.css"

const MarketPage = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');

   
    return (
        <>
    <section class="products-section">        
        <div class="grid">
            <div class="product-card">
                <div class="product-image">
                    <span class="tag">Nuevo</span>
                    <span>IMG</span>
                </div>
                <h3 class="product-name">Noir Absolu - Caballero</h3>
                <p class="product-price">Q. 850.00</p>
                <span class="btn-add">Agregar al carrito</span>
            </div>

            <div class="product-card">
                <div class="product-image">
                    <span>IMG</span>
                </div>
                <h3 class="product-name">Elegance Rose - Dama</h3>
                <p class="product-price">Q. 925.00</p>
                <span class="btn-add">Agregar al carrito</span>
            </div>

            <div class="product-card">
                <div class="product-image">
                    <span>IMG</span>
                </div>
                <h3 class="product-name">Ocean Blue - Unisex</h3>
                <p class="product-price">Q. 750.00</p>
                <span class="btn-add">Agregar al carrito</span>
            </div>
            
            <div class="product-card">
                <div class="product-image">
                    <span>IMG</span>
                </div>
                <h3 class="product-name">Gold Edition - Dama</h3>
                <p class="product-price">Q. 1,200.00</p>
                <span class="btn-add">Agregar al carrito</span>
            </div>

            <div class="product-card">
                <div class="product-image">
                    <span class="tag">Oferta</span>
                    <span>IMG</span>
                </div>
                <h3 class="product-name">Woody Intense - Caballero</h3>
                <p class="product-price">Q. 680.00</p>
                <span class="btn-add">Agregar al carrito</span>
            </div>

            <div class="product-card">
                <div class="product-image">
                    <span>IMG</span>
                </div>
                <h3 class="product-name">Citrus Fresh - Unisex</h3>
                <p class="product-price">Q. 550.00</p>
                <span class="btn-add">Agregar al carrito</span>
            </div>
        </div>
    </section>

    </>
    );
};

export default MarketPage;