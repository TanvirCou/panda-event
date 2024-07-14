"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import searchIcon from "../../../../public/assets/icons/search.svg";
import { Input } from '@/components/ui/input';
import qs from 'query-string'
import { RemoveUrlQueryParams, UrlQueryParams } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
    const currentUrl = qs.parse(params)
  
    currentUrl[key] = value
  
    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      { skipNull: true }
    )
  }
  
  export function removeKeysFromQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
    const currentUrl = qs.parse(params)
  
    keysToRemove.forEach(key => {
      delete currentUrl[key]
    })
  
    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      { skipNull: true }
    )
  }
  

const Search = () => {

    const [query, setQuery] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = '';

      if(query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: query
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['query']
        })
      }

      router.push(newUrl, { scroll: false });
    }, 300)

    return () => clearTimeout(delayDebounceFn);
    }, [query, searchParams, router]);


    return (
        <div className='flex items-center'>
            <Image src={searchIcon} width={30} height={30} alt='' />
            <Input type='text' placeholder='Search...' className='ml-1 border' value={query} onChange={(e) => setQuery(e.target.value)}/>
        </div>
    );
};

export default Search;