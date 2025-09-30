import { Clock, Globe, Mail, MapPin, Navigation, Phone, Send } from 'lucide-react';
import React from 'react';

interface FormData {
    fullName: string;
    jobPosition: string;
    email: string;
    phoneNumber: string;
}

const Contact: React.FC = () => {
    const [formData, setFormData] = React.useState<FormData>({
        fullName: '',
        jobPosition: '',
        email: '',
        phoneNumber: ''
    });

    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

    const handleInputChange = (field: keyof FormData, value: string): void => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (): Promise<void> => {
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Demo request submitted:', formData);
        alert('Demo request submitted successfully!');

        // Reset form
        setFormData({
            fullName: '',
            jobPosition: '',
            email: '',
            phoneNumber: ''
        });
        setIsSubmitting(false);
    };

    const handleGetDirections = (): void => {
        // Open Google Maps with the location
        window.open('https://maps.google.com/?q=Alphabyte+Tower,+New+Administrative+Capital,+Cairo,+Egypt', '_blank');
    };

    return (
        <div className="min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto p-4 lg:p-8">
                <div className="rounded-2xl overflow-hidden">
                    <div className="py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1 space-y-2">
                                <h1 className="text-3xl lg:text-4xl font-bold transition-colors duration-300 text-gray-900 dark:text-white">
                                    Get In Touch
                                </h1>
                                <p className="leading-relaxed max-w-md transition-colors duration-300 text-gray-600 dark:text-gray-300">
                                    We'd love to hear from you! Whether you have questions, need
                                    support, or want to learn more about our services, our team is here
                                    to help.
                                </p>
                            </div>
                            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold transition-colors duration-300 text-gray-900 dark:text-white">
                                                Our Address
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="pl-15 space-y-1">
                                        <p className="text-sm font-medium transition-colors duration-300 text-gray-700 dark:text-gray-300">
                                            Alphabyte Tower
                                        </p>
                                        <p className="text-sm transition-colors duration-300 text-gray-600 dark:text-gray-400">
                                            New Administrative Capital
                                        </p>
                                        <p className="text-sm transition-colors duration-300 text-gray-600 dark:text-gray-400">
                                            Cairo, Egypt
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold transition-colors duration-300 text-gray-900 dark:text-white">
                                                Contact Info
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="pl-15 space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Phone className="w-4 h-4 transition-colors duration-300 text-gray-500 dark:text-gray-400" />
                                            <p className="text-sm transition-colors duration-300 text-gray-700 dark:text-gray-300">
                                                +20 101 234 567
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Mail className="w-4 h-4 transition-colors duration-300 text-gray-500 dark:text-gray-400" />
                                            <p className="text-sm transition-colors duration-300 text-gray-700 dark:text-gray-300">
                                                hello@alphabyte.dev
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Clock className="w-4 h-4 transition-colors duration-300 text-gray-500 dark:text-gray-400" />
                                            <p className="text-sm transition-colors duration-300 text-gray-700 dark:text-gray-300">
                                                Sun-Thu: 9AM - 6PM
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='py-3'>
                            <button
                                onClick={handleGetDirections}
                                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                            >
                                <Navigation className="w-5 h-5" />
                                <span>Get Directions</span>
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="h-64 sm:h-80 lg:h-96">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220084.9685181676!2d31.13279144497514!3d30.044487839570403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sNew%20Administrative%20Capital%2C%20Cairo%20Governorate%2C%20Egypt!5e0!3m2!1sen!2sus!4v1703784234567!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Alphabyte Tower Location"
                                className="w-full h-full"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gray-900/20 pointer-events-none dark:bg-gray-900/30" />
                    </div>
                    <div className="py-8">
                        <div className="max-w-5xl mx-auto flex justify-center flex-col">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <h2 className="flex items-center text-2xl lg:text-3xl font-bold mb-6 transition-colors duration-300 text-gray-900 dark:text-white text-nowrap w-full">
                                    Request a Demo
                                </h2>
                                <div className='flex items-end flex-col gap-6'>
                                    <div className='grid grid-cols-2 gap-4 w-full'>
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="fullName"
                                                className="block text-sm font-medium transition-colors duration-300 text-gray-700 dark:text-gray-300"
                                            >
                                                Full Name*
                                            </label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                value={formData.fullName}
                                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                                                placeholder="Enter your name"
                                                className="w-full px-4 py-3 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent border bg-white border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="jobPosition"
                                                className="block text-sm font-medium transition-colors duration-300 text-gray-700 dark:text-gray-300"
                                            >
                                                Job Position*
                                            </label>
                                            <input
                                                type="text"
                                                id="jobPosition"
                                                value={formData.jobPosition}
                                                onChange={(e) => handleInputChange('jobPosition', e.target.value)}
                                                placeholder="Enter your job position"
                                                className="w-full px-4 py-3 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent border bg-white border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium transition-colors duration-300 text-gray-700 dark:text-gray-300"
                                            >
                                                Email Address*
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                placeholder="Enter your email"
                                                className="w-full px-4 py-3 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent border bg-white border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="phoneNumber"
                                                className="block text-sm font-medium transition-colors duration-300 text-gray-700 dark:text-gray-300"
                                            >
                                                Phone Number*
                                            </label>
                                            <input
                                                type="tel"
                                                id="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                                placeholder="Enter your phone number"
                                                className="w-full px-4 py-3 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent border bg-white border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting || !formData.fullName || !formData.jobPosition || !formData.email || !formData.phoneNumber}
                                            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    <span>Submitting...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    <span>Request Demo</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center space-x-2">
                                        <Globe className="w-4 h-4" />
                                        <span>Available in Arabic & English</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span>•</span>
                                        <span>Response within 24 hours</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span>•</span>
                                        <span>Free consultation</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;