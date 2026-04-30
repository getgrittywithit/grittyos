import {
  Building,
  CreditCard,
  Mail,
  Shield,
  User,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and business settings.
        </p>
      </div>

      {/* Settings Navigation */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="cursor-pointer transition-colors hover:border-primary/50">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer transition-colors hover:border-primary/50">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-base">Business</CardTitle>
              <CardDescription>Company details & branding</CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer transition-colors hover:border-primary/50">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-purple-100">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-base">Team</CardTitle>
              <CardDescription>Manage team members</CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer transition-colors hover:border-primary/50">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-100">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-base">Billing</CardTitle>
              <CardDescription>Subscription & payments</CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer transition-colors hover:border-primary/50">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-100">
              <Mail className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <CardTitle className="text-base">Notifications</CardTitle>
              <CardDescription>Email & alert preferences</CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer transition-colors hover:border-primary/50">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-100">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-base">Security</CardTitle>
              <CardDescription>Password & authentication</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal information and contact details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input id="first_name" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input id="last_name" defaultValue="Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" defaultValue="(512) 555-0100" />
          </div>
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Business Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            This information appears on your quotes and invoices.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="business_name">Business Name</Label>
            <Input id="business_name" defaultValue="Your Business Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="business_address">Address</Label>
            <Input id="business_address" defaultValue="123 Business Street" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="business_city">City</Label>
              <Input id="business_city" defaultValue="Austin" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business_state">State</Label>
              <Input id="business_state" defaultValue="TX" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business_zip">ZIP Code</Label>
              <Input id="business_zip" defaultValue="78701" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="business_email">Business Email</Label>
            <Input
              id="business_email"
              type="email"
              defaultValue="contact@yourbusiness.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax_rate">Default Tax Rate (%)</Label>
            <Input id="tax_rate" type="number" defaultValue="8.25" step="0.01" />
          </div>
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions that affect your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data.
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
