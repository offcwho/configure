'use client'
import { ProductType } from '@/entities/products';
import { findAll } from '@/services/products.service';
import React, { createContext, useState, useContext, useEffect } from 'react';

const SearchContext = createContext<any>(null);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchResults, setSearchResults] = useState<ProductType[]>();
    const [data, setData] = useState<ProductType[]>();

    useEffect(() => {
        const Response = async () => {
            const response = await findAll();
            setData(response);
            setSearchResults(response);
        }
        Response();

    }, [])

    const performSearch = (query: string) => {
        if (data) {
            console.log('123')
            const results = data.filter(item =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
        }
    };

    return (
        <SearchContext.Provider value={{
            searchResults,
            performSearch
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);