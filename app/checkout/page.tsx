'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CreditCard, Truck, ArrowLeft, Check, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/lib/store'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart, user, addOrder } = useStore()
  const [mounted, setMounted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-96 bg-muted rounded-lg" />
        </div>
      </div>
    )
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 999 ? 0 : 99
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create order
    const order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      userId: user?.id || 'guest',
      items: cart,
      total,
      status: 'processing' as const,
      createdAt: new Date().toISOString().split('T')[0],
      shippingAddress: 'Dirección de envío del formulario',
    }

    addOrder(order)
    clearCart()
    toast.success('Pedido realizado con éxito')
    router.push('/profile')
    setIsProcessing(false)
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-md mx-auto p-8">
          <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">No hay productos para pagar</h1>
          <p className="text-muted-foreground mb-6">
            Agrega productos a tu carrito antes de proceder al pago.
          </p>
          <Button asChild>
            <Link href="/products">Ver Productos</Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al carrito
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Información de Envío
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nombre</label>
                    <Input placeholder="Juan" defaultValue={user?.name.split(' ')[0]} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Apellido</label>
                    <Input placeholder="García" defaultValue={user?.name.split(' ')[1]} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Correo Electrónico</label>
                  <Input type="email" placeholder="tu@email.com" defaultValue={user?.email} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Teléfono</label>
                  <Input type="tel" placeholder="+52 (55) 1234-5678" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Dirección</label>
                  <Input placeholder="Calle Principal 123" />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ciudad</label>
                    <Input placeholder="Ciudad de México" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Estado</label>
                    <Input placeholder="CDMX" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Código Postal</label>
                    <Input placeholder="06000" />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Información de Pago
              </CardTitle>
              <CardDescription>
                <div className="flex items-center gap-1 text-xs">
                  <Lock className="h-3 w-3" />
                  Tus datos están protegidos con encriptación SSL
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Número de Tarjeta</label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fecha de Expiración</label>
                    <Input placeholder="MM/AA" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CVV</label>
                    <Input placeholder="123" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre en la Tarjeta</label>
                  <Input placeholder="JUAN GARCIA" />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {item.name}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      x{item.quantity}
                    </Badge>
                  </div>
                  <span className="text-sm font-medium">
                    ${(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envío</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Gratis</span>
                    ) : (
                      `$${shipping}`
                    )}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-green-600" />
                  Garantía de devolución de 30 días
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-green-600" />
                  Envío seguro y rastreable
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-green-600" />
                  Pago 100% seguro
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                size="lg"
                onClick={handleSubmit}
                disabled={isProcessing}
              >
                {isProcessing ? 'Procesando...' : `Pagar $${total.toLocaleString()}`}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
