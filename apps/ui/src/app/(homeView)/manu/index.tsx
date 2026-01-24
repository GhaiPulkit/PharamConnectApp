import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Phone, Mail, Search, FileText, ExternalLink, Image } from 'lucide-react';

export default function PharmacyProfile() {
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    { id: 1, name: 'Capsule', hasExplore: true },
    { id: 2, name: 'Injections', hasExplore: true },
    { id: 3, name: 'Injections', hasExplore: false },
    { id: 4, name: 'Tablets', hasExplore: false },
    { id: 5, name: 'Syrups', hasExplore: false },
    { id: 6, name: 'Ointments', hasExplore: false },
  ];

  const compositions = [
    { id: '001', composition: 'Paracetamol 500mg', type: 'Tablet', minOrders: '1000' },
    { id: '002', composition: 'Amoxicillin 250mg', type: 'Capsule', minOrders: '500' },
    { id: '003', composition: 'Ibuprofen 400mg', type: 'Tablet', minOrders: '2000' },
    { id: '004', composition: 'Vitamin D3 1000IU', type: 'Softgel', minOrders: '1500' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Banner */}
      <div className="w-full h-40 md:h-52 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900" />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 pb-12">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 shadow-lg" />
            </div>

            {/* Company Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                    Sun Pharmacy
                  </h1>
                  <p className="text-gray-500 mt-1 flex items-center gap-1">
                    Ipsum LoremIpsum LoremIpsum Lorem
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full lg:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search Product, Composition"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-purple-100 text-sm"
                  />
                </div>
              </div>

              {/* Contact Info & Request Button */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>Germany</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>+1 545 980 9898</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>example@gmail.com</span>
                </div>
                <Button className="bg-purple-700 hover:bg-purple-800 text-white ml-auto">
                  <FileText className="w-4 h-4 mr-2" />
                  Request Form
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">About Us</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Visual storytelling is essential for automotive manufacturers, and offering interactive customization tools
            can keep users engaged. Sustainability messaging should be integrated naturally into the site to show
            corporate responsibility without being forced to do so
          </p>
        </div>

        {/* Products Section */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <CardContent className="p-0">
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 relative flex items-center justify-center">
                    <Image className="w-10 h-10 text-gray-400" />
                    {product.name && (
                      <span className="absolute top-3 left-3 text-xs font-medium text-gray-700">
                        {product.name}
                      </span>
                    )}
                    {product.hasExplore && (
                      <Button 
                        size="sm" 
                        className="absolute bottom-3 left-3 bg-purple-700 hover:bg-purple-800 text-white text-xs h-7 px-3"
                      >
                        Explore →
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Composition Table Section */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Composition Available</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 border-b border-gray-100">
                  <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Composition</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Min Orders</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {compositions.map((comp) => (
                  <TableRow key={comp.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="text-sm text-gray-600">{comp.id}</TableCell>
                    <TableCell className="text-sm text-gray-900 font-medium">{comp.composition}</TableCell>
                    <TableCell className="text-sm text-gray-600">{comp.type}</TableCell>
                    <TableCell className="text-sm text-gray-600 text-right">{comp.minOrders}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}