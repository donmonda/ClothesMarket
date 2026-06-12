'use client'

import { use, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProductCard } from '@/components/product-card'
import { products } from '@/lib/data'
import { useStore } from '@/lib/store'
import { toast } from 'sonner'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const product = products.find((p) => p.id === id)
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore()
  
  const [mounted, setMounted] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!product) {
    notFound()
  }

  const inWishlist = mounted ? isInWishlist(product.id) : false
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    toast.success(`${quantity} ${quantity > 1 ? 'unidades agregadas' : 'unidad agregada'} al carrito`, {
      description: product.name,
    })
  }

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.info('Eliminado de favoritos')
    } else {
      addToWishlist(product)
      toast.success('Agregado a favoritos')
    }
  }

  // Mock images for gallery
  const images = [product.image, product.image, product.image]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a productos
        </Link>
      </div>

      {/* Product Details */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/30">
            <Image
              src={images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.badge && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                {product.badge}
              </Badge>
            )}
            {discount > 0 && !product.badge && (
              <Badge variant="destructive" className="absolute top-4 left-4">
                -{discount}%
              </Badge>
            )}
          </div>
          <div className="flex gap-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === i
                    ? 'border-primary'
                    : 'border-transparent hover:border-border'
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
                <span className="ml-2 font-medium">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">
                ({product.reviews} reseñas)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-bold text-primary">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
            {discount > 0 && (
              <Badge variant="destructive">Ahorras ${(product.originalPrice! - product.price).toLocaleString()}</Badge>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <Separator />

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <>
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-green-600 font-medium">En stock</span>
                {product.stock <= 10 && (
                  <span className="text-orange-500 text-sm">
                    (Solo {product.stock} disponibles)
                  </span>
                )}
              </>
            ) : (
              <span className="text-destructive font-medium">Agotado</span>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Cantidad:</span>
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              size="lg"
              className="flex-1 gap-2"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5" />
              Agregar al Carrito
            </Button>
            <Button
              size="lg"
              variant={inWishlist ? 'default' : 'outline'}
              onClick={handleToggleWishlist}
            >
              <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <Card>
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Truck className="h-6 w-6 text-primary mb-2" />
                <p className="text-xs font-medium">Envío Gratis</p>
                <p className="text-xs text-muted-foreground">En compras +$999</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Shield className="h-6 w-6 text-primary mb-2" />
                <p className="text-xs font-medium">Garantía</p>
                <p className="text-xs text-muted-foreground">1 año</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center text-center">
                <RotateCcw className="h-6 w-6 text-primary mb-2" />
                <p className="text-xs font-medium">Devoluciones</p>
                <p className="text-xs text-muted-foreground">30 días</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0">
          <TabsTrigger
            value="description"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Descripción
          </TabsTrigger>
          <TabsTrigger
            value="specs"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Especificaciones
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Reseñas ({product.reviews})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="pt-6">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Experimenta la calidad premium con este producto cuidadosamente diseñado 
              para satisfacer las necesidades más exigentes. Fabricado con los mejores 
              materiales y tecnología de vanguardia para garantizar durabilidad y rendimiento excepcional.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="specs" className="pt-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex justify-between py-3 border-b">
              <span className="text-muted-foreground">Categoría</span>
              <span className="font-medium capitalize">{product.category}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-muted-foreground">SKU</span>
              <span className="font-medium">NX-{product.id.padStart(6, '0')}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-muted-foreground">Disponibilidad</span>
              <span className="font-medium">{product.stock} unidades</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-muted-foreground">Calificación</span>
              <span className="font-medium">{product.rating} / 5</span>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-6">
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold text-primary">
                        {['JG', 'MC', 'AL'][i]}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">
                          {['Juan García', 'María Castro', 'Ana López'][i]}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Hace {[2, 5, 10][i]} días
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${
                              j < [5, 4, 5][i]
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground/30'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {[
                          'Excelente producto, superó mis expectativas. La calidad es increíble y llegó muy rápido.',
                          'Muy buen producto, relación calidad-precio excelente. Lo recomiendo.',
                          'Increíble compra. Ya es mi segundo pedido y sigo muy satisfecha.',
                        ][i]}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
