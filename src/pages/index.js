import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import SearchMenu from './SearchMenu.js'

export default function Home() {
  return (
    <>
      <h1 className="main-header">DB-Price finder</h1>
      <SearchMenu />
    </>
  );
}
