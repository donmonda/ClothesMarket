'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, Mail, MapPin, Phone, Edit, Package, Heart, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useStore } from '@/lib/store'
import { mockOrders } from '@/lib/data'

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  processing: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  shipped: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  delivered: 'bg-green-500/10 text-green-600 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-600 border-red-500/20',
}

const statusLabels = {
  pending: 'Pendiente',
  processing: 'Procesando',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, setUser, wishlist, orders } = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-muted rounded-lg" />
          <div className="h-64 bg-muted rounded-lg" />
        </div>
      </div>
    )
  }

  if (!user) {
    router.push('/login')
    return null
  }

  const allOrders = [...mockOrders, ...orders]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  {user.role === 'admin' && (
                    <Badge variant="secondary">Admin</Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Miembro desde Enero 2024
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
                {user.role === 'admin' && (
                  <Button size="sm" asChild>
                    <Link href="/admin">Panel Admin</Link>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Package className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{allOrders.length}</p>
              <p className="text-sm text-muted-foreground">Pedidos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{wishlist.length}</p>
              <p className="text-sm text-muted-foreground">Favoritos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-muted-foreground">Direcciones</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Settings className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">5</p>
              <p className="text-sm text-muted-foreground">Cupones</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="orders">Mis Pedidos</TabsTrigger>
            <TabsTrigger value="info">Información</TabsTrigger>
            <TabsTrigger value="addresses">Direcciones</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Pedidos</CardTitle>
                <CardDescription>
                  Revisa el estado de tus pedidos recientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                {allOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Aún no tienes pedidos
                    </p>
                    <Button className="mt-4" asChild>
                      <Link href="/products">Explorar Productos</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {allOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{order.id}</span>
                            <Badge
                              variant="outline"
                              className={statusColors[order.status]}
                            >
                              {statusLabels[order.status]}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} productos • {order.createdAt}
                          </p>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <span className="font-semibold text-primary">
                            ${order.total.toLocaleString()}
                          </span>
                          <Button variant="outline" size="sm">
                            Ver Detalles
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>
                  Gestiona tu información de cuenta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Nombre Completo
                    </label>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{user.name}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Correo Electrónico
                    </label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user.email}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Teléfono
                    </label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>+52 (55) 1234-5678</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Ubicación
                    </label>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Ciudad de México, CDMX</span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-4">
                  <Button variant="outline">Cambiar Contraseña</Button>
                  <Button
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                      setUser(null)
                      router.push('/')
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Mis Direcciones</CardTitle>
                    <CardDescription>
                      Gestiona tus direcciones de envío
                    </CardDescription>
                  </div>
                  <Button size="sm">Agregar Dirección</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="border-primary">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <Badge>Principal</Badge>
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                      </div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Calle Principal 123
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Col. Centro, CP 06000
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Ciudad de México, CDMX
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Tel: +52 (55) 1234-5678
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline">Trabajo</Badge>
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                      </div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Av. Reforma 500, Piso 12
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Col. Juárez, CP 06600
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Ciudad de México, CDMX
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Tel: +52 (55) 9876-5432
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
