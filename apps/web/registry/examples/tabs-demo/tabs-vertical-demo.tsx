import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/registry/ui/tabs"
import { Bell, Settings, Shield, User } from "lucide-react"

export default function TabsVerticalDemo() {
    return (
        <Tabs defaultValue="general" orientation="vertical" className="w-full">
            <div className="flex gap-4">
                <TabsList className="flex-col h-fit">
                    <TabsTrigger value="general">
                        <Settings className="w-4 h-4 mr-2" />
                        General
                    </TabsTrigger>
                    <TabsTrigger value="security">
                        <Shield className="w-4 h-4 mr-2" />
                        Security
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        <Bell className="w-4 h-4 mr-2" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="account">
                        <User className="w-4 h-4 mr-2" />
                        Account
                    </TabsTrigger>
                </TabsList>
                <div className="flex-1">
                    <TabsContent value="general">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">General Settings</h3>
                            <div className="text-muted-foreground">Configure your general application settings.</div>
                        </div>
                    </TabsContent>
                    <TabsContent value="security">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Security Settings</h3>
                            <div className="text-muted-foreground">Manage your security settings.</div>
                        </div>
                    </TabsContent>
                    <TabsContent value="notifications">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Notification Settings</h3>
                            <div className="text-muted-foreground">Control your notifications.</div>
                        </div>
                    </TabsContent>
                    <TabsContent value="account">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Account Settings</h3>
                            <div className="text-muted-foreground">Manage your account information.</div>
                        </div>
                    </TabsContent>
                </div>
            </div>
        </Tabs>
    )
}