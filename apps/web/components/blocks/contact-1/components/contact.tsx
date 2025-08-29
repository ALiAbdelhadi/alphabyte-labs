import { cn } from '@/lib/utils';
import { Button } from '@/registry/ui/button';
import { Checkbox } from '@/registry/ui/checkbox';
import { Input } from '@/registry/ui/input';
import { Label } from '@/registry/ui/label';
import { Textarea } from '@/registry/ui/textarea';
import {
    MapPin,
    MessageCircle,
    Phone,
    Send,
    Shield,
    Users
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoLogoTwitter } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

// Form data interface
interface FormData {
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    phone: string;
    message: string;
    agreeToPrivacy: boolean;
}

// Form errors interface
interface FormErrors {
    [key: string]: string;
}

// Validation functions
const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

const validateRequired = (value: string, minLength: number = 2): boolean => {
    return value.trim().length >= minLength;
};

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phone: '',
        message: '',
        agreeToPrivacy: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    // Validate entire form
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // First name validation
        if (!validateRequired(formData.firstName)) {
            newErrors.firstName = 'First name is required (at least 2 characters)';
        }

        // Last name validation
        if (!validateRequired(formData.lastName)) {
            newErrors.lastName = 'Last name is required (at least 2 characters)';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        // Message validation
        if (!validateRequired(formData.message, 10)) {
            newErrors.message = 'Message is required (at least 10 characters)';
        } else if (formData.message.length > 500) {
            newErrors.message = 'The message must not exceed 500 characters';
        }

        // Privacy policy validation
        if (!formData.agreeToPrivacy) {
            newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            alert('Message sent successfully! We will contact you shortly');

            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                company: '',
                email: '',
                phone: '',
                message: '',
                agreeToPrivacy: false,
            });
        } catch (error) {
            alert('An error occurred while sending the message. Please try again');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-6xl w-full bg-card text-card-foreground rounded-3xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[500px]">
                    <div className="lg:col-span-2 bg-gradient-to-br from-blue-700 via-blue-400 to-blue-200 p-8 lg:p-12 text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-600/20" />
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-lg" />
                        <div className="absolute top-1/2 right-0 w-24 h-24 bg-white/5 rounded-full blur-md" />
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-bold mb-8 leading-tight">
                                    Contact Us
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4 group">
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                                            <p className="text-white/80 text-sm leading-relaxed">
                                                Come visit us at our main headquarters
                                                <br />
                                                Cairo, Egypt - New Administrative Capital
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4 group">
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                                            <p className="text-white/80 text-sm mb-1">
                                                Our technical team is ready to help you
                                            </p>
                                            <a
                                                href="mailto:hello@alphabyte.dev"
                                                className="text-white/90 text-sm hover:text-white transition-colors border-b border-white/30 hover:border-white"
                                            >
                                                hello@alphabyte.dev
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4 group">
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                                            <p className="text-white/80 text-sm mb-1">
                                                Sunday-Thursday from 9 AM to 6 PM (Cairo time)
                                            </p>
                                            <Link
                                                href="tel:+20101234567"
                                                className="text-white/90 text-sm hover:text-white transition-colors border-b border-white/30 hover:border-white"
                                            >
                                                (+20) 10 123-456-78
                                            </Link>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                                        <div className="flex space-x-4">
                                            {[
                                                { Icon: FaFacebook, href: '#', label: 'Facebook' },
                                                { Icon: FaLinkedin, href: '#', label: 'LinkedIn' },
                                                { Icon: AiFillInstagram, href: '#', label: 'Instagram' },
                                                { Icon: IoLogoTwitter, href: '#', label: 'Twitter' },
                                            ].map(({ Icon, href, label }) => (
                                                <Link
                                                    key={label}
                                                    href={href}
                                                    aria-label={label}
                                                    className="w-10 h-10 hover:bg-white/10 rounded-full flex items-center justify-center transition-all"
                                                >
                                                    <Icon className="w-5 h-5 text-white " />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 p-8 lg:p-12 bg-card">
                        <div className="space-y-6 max-w-md mx-auto lg:mx-0">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="firstName" className="block text-sm font-semibold text-muted-foreground mb-2">
                                        First Name *
                                    </Label>
                                    <Input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="Ahmed"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={cn(
                                            "w-full px-4 py-3 border-2 rounded-xl text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-300 hover:bg-muted/50",
                                            errors.firstName ? 'border-destructive' : 'border-border'
                                        )}
                                    />
                                    {errors.firstName && (
                                        <p className="mt-1 text-xs text-destructive">
                                            {errors.firstName}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="lastName" className="block text-sm font-semibold text-muted-foreground mb-2">
                                        Last Name *
                                    </Label>
                                    <Input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Mohamed"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={cn(
                                            "w-full px-4 py-3 border-2 rounded-xl text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-300 hover:bg-muted/50",
                                            errors.lastName ? 'border-destructive' : 'border-border'
                                        )}
                                    />
                                    {errors.lastName && (
                                        <p className="mt-1 text-xs text-destructive">
                                            {errors.lastName}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="company" className="block text-sm font-semibold text-muted-foreground mb-2">
                                    Company Name
                                </Label>
                                <Input
                                    type="text"
                                    id="company"
                                    name="company"
                                    placeholder="Advanced Tech Company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 border-border rounded-xl text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-300 hover:bg-muted/50"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email" className="block text-sm font-semibold text-muted-foreground mb-2">
                                    Email Address *
                                </Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="ahmed@company.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={cn(
                                        "w-full px-4 py-3 border-2 rounded-xl text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-300 hover:bg-muted/50",
                                        errors.email ? 'border-destructive' : 'border-border'
                                    )}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-destructive">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="phone" className="block text-sm font-semibold text-muted-foreground mb-2">
                                    Phone Number *
                                </Label>
                                <div className="relative">
                                    <Input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="+20 10 1234 5678"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={cn(
                                            "w-full px-4 py-3 border-2 rounded-xl text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-300 hover:bg-muted/50 pl-10", // Added pl-10 for icon padding
                                            errors.phone ? 'border-destructive' : 'border-border'
                                        )}
                                    />
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                </div>
                                {errors.phone && (
                                    <p className="mt-1 text-xs text-destructive">
                                        {errors.phone}
                                    </p>
                                )}
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Example: +20 10 1234 5678, +966 50 123 4567, +971 50 123 4567
                                </p>
                            </div>
                            <div>
                                <Label htmlFor="message" className="block text-sm font-semibold text-muted-foreground mb-2">
                                    Project Details *
                                </Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    placeholder="Tell us about your project and how we can help you achieve your business goals..."
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className={cn(
                                        "w-full px-4 py-3 border-2 rounded-xl text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring transition-all duration-300 resize-none hover:bg-muted/50",
                                        errors.message ? 'border-destructive' : 'border-border'
                                    )}
                                />
                                <div className="flex justify-between items-center mt-1">
                                    {errors.message ? (
                                        <p className="text-xs text-destructive">
                                            {errors.message}
                                        </p>
                                    ) : (
                                        <p className="text-xs text-muted-foreground">
                                            Minimum 10 characters
                                        </p>
                                    )}
                                    <p className={cn("text-xs", formData.message.length > 450 ? 'text-destructive' : 'text-muted-foreground')}>
                                        {formData.message.length}/500
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl border border-border/50 hover:border-border transition-colors">
                                <div className="flex items-start space-x-3">
                                    <Checkbox
                                        id="agreeToPrivacy"
                                        name="agreeToPrivacy"
                                        checked={formData.agreeToPrivacy}
                                        onCheckedChange={(checked) =>
                                            setFormData(prev => ({ ...prev, agreeToPrivacy: !!checked }))
                                        }
                                        className="mt-1"
                                    />
                                    <div className="flex-1">
                                        <label htmlFor="agreeToPrivacy" className="text-sm text-foreground leading-relaxed cursor-pointer ">
                                            I agree to receive updates about innovative solutions and services. I understand and accept the{' '}
                                            <Link href="#" className="text-blue-500 hover:text-blue-400 underline font-medium transition-colors">
                                                Privacy Policy
                                            </Link>{' '}
                                            and the{' '}
                                            <Link href="#" className="text-blue-500 hover:text-blue-400 underline font-medium transition-colors">
                                                Terms of Service
                                            </Link>
                                        </label>
                                        {errors.agreeToPrivacy && (
                                            <p className="mt-2 text-xs text-destructive">
                                                {errors.agreeToPrivacy}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <Button
                                type="button"
                                onClick={handleSubmit}
                                disabled={!formData.agreeToPrivacy || isSubmitting}
                                className={cn(
                                    "w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden",
                                    formData.agreeToPrivacy && !isSubmitting
                                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                        : 'bg-muted text-muted-foreground cursor-not-allowed',
                                    'shadow-lg'
                                )}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-foreground border-t-transparent rounded-full animate-spin"></div>
                                            Submitting...
                                        </>
                                    ) : formData.agreeToPrivacy ? (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Send Message
                                        </>
                                    ) : (
                                        'Please agree to the privacy policy'
                                    )}
                                </span>
                            </Button>
                            <div className="text-center space-y-2">
                                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Shield className="w-3 h-3" />
                                        SSL Encrypted and GDPR Compliant
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                                    <Users className="w-3 h-3" />
                                    Trusted by over 500 companies in the MENA region
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;