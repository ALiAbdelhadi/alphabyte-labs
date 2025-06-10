import { useState } from "react";
import StatusSection from "./components/status-section";

const page = () => {
    const [customServices] = useState([
        {
            id: 'api-gateway',
            name: 'API Gateway',
            status: 'operational',
            description: 'Core API routing and management',
            details: 'All API endpoints are responding within normal parameters'
        },
        {
            id: 'database',
            name: 'Database Cluster',
            status: 'incident',
            description: 'Primary database infrastructure',
            details: 'Experiencing elevated response times. Engineering team investigating.',
            hasDetails: true
        },
        {
            id: 'cdn',
            name: 'Content Delivery Network',
            status: 'operational',
            description: 'Global content distribution network',
            details: 'CDN nodes are performing optimally across all regions'
        }
    ]);

    const handleIncidentClick = () => {
        console.log('Navigating to incident history...');
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <StatusSection
                    title="Alpha / Status"
                    onIncidentClick={handleIncidentClick}
                />
                <StatusSection
                    title="Custom Services Status"
                    services={customServices}
                    onIncidentClick={handleIncidentClick}
                    className="mt-8"
                />
            </div>
        </div>
    );
};

export default page;