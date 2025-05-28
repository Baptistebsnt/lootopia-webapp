'use client';

import Layout from '@/Layout/Layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Separator } from '@/shared/components/ui/separator';
import { Award, Clock, MapPin, Settings, Shield, Trophy } from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Données simulées
  const [user, setUser] = useState({
    name: 'Malik Explorateur',
    email: 'malik@example.com',
    address: "123 Rue de l'Aventure, Paris",
    password: '',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Malik',
    badges: ['Découvreur', 'Survivant', 'Maître du temps'],
    stats: {
      inscrits: 12,
      abandonnes: 3,
      termines: 9,
    },
  });

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
    password: '',
  });

  const getBadgeStyle = (badgeType: string) => {
    if (badgeType === 'partner') {
      return 'bg-black text-white border-black hover:bg-gray-800';
    }
    return 'bg-white text-black border-gray-300 hover:bg-gray-50';
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveSettings = () => {
    // Mettre à jour les données utilisateur
    setUser(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      address: formData.address,
    }));

    // Fermer le modal
    setIsSettingsOpen(false);

    // Ici vous pourriez ajouter l'appel API pour sauvegarder
    console.log('Paramètres sauvegardés:', formData);
  };

  const handleOpenSettings = () => {
    // Réinitialiser le formulaire avec les données actuelles
    setFormData({
      name: user.name,
      email: user.email,
      address: user.address,
      password: '',
    });
    setIsSettingsOpen(true);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header avec informations utilisateur */}
          <Card className="overflow-hidden border-2 border-black">
            <div className="bg-black h-20 relative flex items-center justify-center">
              <h1 className="text-3xl font-bold text-white">{user.name}</h1>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:bg-white/20" onClick={handleOpenSettings}>
                <Settings className="h-5 w-5" />
              </Button>
            </div>
            <CardContent className="relative pt-6 pb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 -mt-10 sm:-mt-8">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={user.avatarUrl || '/placeholder.svg'} alt={user.name} />
                  <AvatarFallback className="text-2xl font-bold bg-black text-white">
                    {user.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left flex-1 flex flex-col justify-center items-start min-h-[100px] pt-4">
                  <p className="text-gray-600 mb-5">{user.email}</p>

                  {/* Badges normaux */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap justify-start gap-2">
                      {user.badges.map((badge, index) => (
                        <Badge key={index} variant="outline" className={getBadgeStyle('normal')}>
                          <Award className="w-3 h-3 mr-1" />
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    {/* Badges partenaires avec logos */}
                    <div className="flex flex-wrap justify-start gap-2">
                      <Badge variant="outline" className="bg-black text-white border-black hover:bg-gray-800 px-3 py-1">
                        <img src="/placeholder.svg?height=16&width=16" alt="Nike" className="w-4 h-4 mr-2 bg-white rounded-sm p-0.5" />
                        Nike Explorer
                      </Badge>
                      <Badge variant="outline" className="bg-black text-white border-black hover:bg-gray-800 px-3 py-1">
                        <img src="/placeholder.svg?height=16&width=16" alt="Adidas" className="w-4 h-4 mr-2 bg-white rounded-sm p-0.5" />
                        Adidas Adventure
                      </Badge>
                      <Badge variant="outline" className="bg-black text-white border-black hover:bg-gray-800 px-3 py-1">
                        <img src="/placeholder.svg?height=16&width=16" alt="Puma" className="w-4 h-4 mr-2 bg-white rounded-sm p-0.5" />
                        Puma Premium
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Modal Paramètres */}
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogContent className="sm:max-w-[425px] border-2 border-black">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Paramètres du profil
                </DialogTitle>
                <DialogDescription>Modifiez vos informations personnelles ci-dessous.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right font-medium">
                    Nom
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    className="col-span-3 border-gray-300"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    className="col-span-3 border-gray-300"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right font-medium">
                    Adresse
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={e => handleInputChange('address', e.target.value)}
                    className="col-span-3 border-gray-300"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right font-medium">
                    Mot de passe
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={e => handleInputChange('password', e.target.value)}
                    placeholder="Nouveau mot de passe"
                    className="col-span-3 border-gray-300"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsSettingsOpen(false)} className="border-gray-300">
                  Annuler
                </Button>
                <Button onClick={handleSaveSettings} className="bg-black text-white hover:bg-gray-800">
                  Sauvegarder
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow border-2 border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Trésors Inscrits</CardTitle>
                <MapPin className="h-4 w-4 text-black" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black">{user.stats.inscrits}</div>
                <p className="text-xs text-gray-500 mt-1">Aventures en cours</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-2 border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Trésors Terminés</CardTitle>
                <Trophy className="h-4 w-4 text-black" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black">{user.stats.termines}</div>
                <p className="text-xs text-gray-500 mt-1">Missions accomplies</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-2 border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Trésors Abandonnés</CardTitle>
                <Clock className="h-4 w-4 text-black" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black">{user.stats.abandonnes}</div>
                <p className="text-xs text-gray-500 mt-1">À reprendre plus tard</p>
              </CardContent>
            </Card>
          </div>

          {/* Section Partenariats */}
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-black" />
                Partenariats Exclusifs
              </CardTitle>
              <CardDescription>Vos collaborations avec nos marques partenaires</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                    <img src="/placeholder.svg?height=24&width=24" alt="Nike" className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium text-black">Nike Explorer</div>
                    <div className="text-sm text-gray-500">Partenaire officiel</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                    <img src="/placeholder.svg?height=24&width=24" alt="Adidas" className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium text-black">Adidas Adventure</div>
                    <div className="text-sm text-gray-500">Partenaire officiel</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                    <img src="/placeholder.svg?height=24&width=24" alt="Puma" className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium text-black">Puma Premium</div>
                    <div className="text-sm text-gray-500">Partenaire officiel</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Résumé des performances */}
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-black" />
                Résumé des Performances
              </CardTitle>
              <CardDescription>Votre progression dans l'univers des chasses au trésor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Taux de réussite</span>
                <span className="text-sm text-gray-600">{Math.round((user.stats.termines / user.stats.inscrits) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-black h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(user.stats.termines / user.stats.inscrits) * 100}%` }}
                ></div>
              </div>

              <Separator />

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-black">{user.badges.length}</div>
                  <div className="text-sm text-gray-600">Badges standards</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-black">3</div>
                  <div className="text-sm text-gray-600">Badges partenaires</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-black">{user.stats.inscrits - user.stats.abandonnes}</div>
                  <div className="text-sm text-gray-600">Trésors actifs</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
