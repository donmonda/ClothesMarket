'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ProductCard } from '@/components/product-card'
import { useStore } from '@/lib/store'
import { toast } from 'sonner'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, clearCart } = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    )
  }

  const handleAddAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product)
    })
    toast.success(`${wishlist.length} productos agregados al carrito`)
  }

  const handleClearWishlist = () => {
    wishlist.forEach((product) => {
      removeFromWishlist(product.id)
    })
    toast.info('Lista de deseos vaciada')
  }

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center p-8">
          <div className="h-20 w-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-6">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Tu lista de deseos está vacía</h1>
          <p className="text-muted-foreground mb-6">
            Guarda tus productos favoritos para comprarlos más tarde.
          </p>
          <Link href="/products">
            <Button className="gap-2">
              Explorar Productos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Lista de Deseos</h1>
          <p className="text-muted-foreground mt-1">
            {wishlist.length} {wishlist.length === 1 ? 'producto guardado' : 'productos guardados'}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleAddAllToCart}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Agregar Todo al Carrito
          </Button>
          <Button
            variant="ghost"
            className="text-destructive hover:text-destructive"
            onClick={handleClearWishlist}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Vaciar Lista
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
