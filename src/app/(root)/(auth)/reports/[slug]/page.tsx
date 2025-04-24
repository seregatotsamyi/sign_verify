'use server';
import React from 'react'

export default async function Page({
    params
  }:{ params: Promise<{ slug: string }>}) {
    const { slug } = await params
    console.log(slug)
  return (
    <div >page</div>
  )
}
