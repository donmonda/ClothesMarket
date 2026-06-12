'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Truck, Shield, CreditCard, Headphones, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProductCard, ProductCardSkeleton } from '@/components/product-card'
import { products, categories } from '@/lib/data'
import { useState, useEffect } from 'react'

const features = [
  {
    icon: Truck,
    title: 'Envío Gratis',
    description: 'En compras mayores a $999',
  },
  {
    icon: Shield,
    title: 'Compra Segura',
    description: 'Protección al comprador',
  },
  {
    icon: CreditCard,
    title: 'Pago Fácil',
    description: 'Múltiples métodos de pago',
  },
  {
    icon: Headphones,
    title: 'Soporte 24/7',
    description: 'Atención personalizada',
  },
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const featuredProducts = products.filter((p) => p.featured)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="animate-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Nueva colección 2024
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-balance">
                Descubre el Futuro del{' '}
                <span className="text-primary">Shopping Online</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Explora nuestra selección premium de productos con tecnología de punta, 
                diseño excepcional y precios que te sorprenderán.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" className="gap-2 shadow-lg shadow-primary/25">
                    Explorar Productos
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/products?category=electronics">
                  <Button size="lg" variant="outline" className="gap-2">
                    Ver Ofertas
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <p className="text-3xl font-bold text-primary">50K+</p>
                  <p className="text-sm text-muted-foreground">Clientes Felices</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div>
                  <p className="text-3xl font-bold text-primary">150+</p>
                  <p className="text-sm text-muted-foreground">Productos</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div>
                  <p className="text-3xl font-bold text-primary">4.9</p>
                  <p className="text-sm text-muted-foreground">Calificación</p>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl blur-3xl" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transform translate-y-8">
                    <Image
                      src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=500&fit=crop"
                      alt="MacBook"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
                      alt="Sneakers"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=300&fit=crop"
                      alt="Headphones"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold">Explora por Categoría</h2>
              <p className="text-muted-foreground mt-1">Encuentra lo que buscas fácilmente</p>
            </div>
            <Link href="/products">
              <Button variant="ghost" className="gap-1">
                Ver todas <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/products?category=${category.id}`}>
                <Card className="group hover:border-primary/50 hover:shadow-md transition-all duration-300 cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">
                        {category.id === 'electronics' && '💻'}
                        {category.id === 'clothing' && '👕'}
                        {category.id === 'home' && '🏠'}
                        {category.id === 'sports' && '⚽'}
                        {category.id === 'books' && '📚'}
                        {category.id === 'beauty' && '✨'}
                      </span>
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge variant="secondary" className="mb-2">Destacados</Badge>
              <h2 className="text-2xl lg:text-3xl font-bold">Productos Destacados</h2>
              <p className="text-muted-foreground mt-1">Los favoritos de nuestros clientes</p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="gap-1">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {!mounted
              ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : featuredProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/80">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative grid lg:grid-cols-2 gap-8 items-center p-8 lg:p-12">
              <div className="space-y-6 text-primary-foreground">
                <Badge className="bg-white/20 text-white hover:bg-white/30">
                  Oferta Especial
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Hasta 50% de Descuento en Electrónica
                </h2>
                <p className="text-primary-foreground/80 max-w-md">
                  Aprovecha nuestras ofertas exclusivas en los mejores productos tecnológicos. 
                  Oferta válida por tiempo limitado.
                </p>
                <Link href="/products?category=electronics">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Comprar Ahora
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="hidden lg:flex justify-end">
                <div className="relative w-80 h-80">
                  <Image
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop"
                    alt="iPhone"
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge variant="secondary" className="mb-2">Nuevos</Badge>
              <h2 className="text-2xl lg:text-3xl font-bold">Recién Llegados</h2>
              <p className="text-muted-foreground mt-1">Lo más nuevo en nuestra tienda</p>
            </div>
            <Link href="/products">
              <Button variant="outline" className="gap-1">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {!mounted
              ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : products.slice(4, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-8 lg:p-12 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Únete a Nuestra Comunidad
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Suscríbete a nuestro newsletter y recibe ofertas exclusivas, 
                novedades y descuentos especiales directamente en tu bandeja de entrada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <Button size="lg" className="shrink-0">
                  Suscribirse
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
