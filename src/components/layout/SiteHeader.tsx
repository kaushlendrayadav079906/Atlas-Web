import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  CheckCircle2,
  Settings,
  Layers,
  Headphones,
  RefreshCw,
  Link2,
  Users,
  Database,
  Zap,
  Cpu,
  Factory,
  Truck,
  Boxes,
  TrendingUp,
  Building2,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  BookOpen,
  FileText,
  HelpCircle,
  Ship,
  PhoneCall
} from 'lucide-react';
import { CallbackModal } from '../ui/CallbackModal';
import { Button } from '../ui/Button';
import { MegaMenuDropdown } from './MegaMenuDropdown';
import { NAVIGATION_ITEMS, TOP_BAR_INFO, NavItem } from '../../data/navigationData';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Settings,
  Layers,
  Headphones,
  RefreshCw,
  Link2,
  Users,
  Database,
  Zap,
  Cpu,
  Factory,
  Truck,
  Boxes,
  TrendingUp,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Clock,
  BookOpen,
  FileText,
  HelpCircle,
  Ship,
};

export const SiteHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('Home');
  const location = useLocation();
  const dropdownCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync active section based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/about') {
      setActiveSection('About');
    } else if (path.startsWith('/services')) {
      setActiveSection('Services');
    } else if (path.startsWith('/solutions')) {
      setActiveSection('Solutions');
    } else if (path.startsWith('/industries')) {
      setActiveSection('Industries');
    } else if (path.startsWith('/case-studies')) {
      setActiveSection('Case Studies');
    } else if (path.startsWith('/partners')) {
      setActiveSection('Partners');
    } else if (path.startsWith('/contact')) {
      setActiveSection('Contact');
    } else if (path.startsWith('/blog') || path.startsWith('/insights')) {
      setActiveSection('Blog');
    } else if (path === '/' && !location.hash) {
      setActiveSection('Home');
    }
    // Close dropdowns on route transition
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Handle hover open with debounce on leave
  const handleMouseEnter = (itemName: string, hasDropdown: boolean) => {
    if (dropdownCloseTimeoutRef.current) {
      clearTimeout(dropdownCloseTimeoutRef.current);
      dropdownCloseTimeoutRef.current = null;
    }
    if (hasDropdown) {
      setActiveDropdown(itemName);
    } else {
      setActiveDropdown(null);
    }
  };

  const handleMouseLeave = () => {
    dropdownCloseTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const toggleMobileAccordion = (itemName: string) => {
    setMobileExpandedItem((prev) => (prev === itemName ? null : itemName));
  };

  return (
    <>

      {/* Main Sticky Navigation Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-atlas-line shadow-[0_8px_24px_-16px_rgba(10,27,79,0.25)]'
            : 'bg-white border-b border-atlas-line'
        }`}
      >
        <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="flex items-center justify-between h-[90px] lg:h-[96px] w-full">
            
            {/* Left Side: Brand Logo & Company Name */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-atlas-gold rounded-lg p-1 shrink-0"
              onClick={() => setActiveDropdown(null)}
              aria-label="ATLAS Technosoft Home"
            >
              {/* Increased Company Logo Size (+25-30%) with Preserved Aspect Ratio */}
              <div className="relative h-[60px] w-[70px] sm:h-[64px] sm:w-[74px] shrink-0 flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="ATLAS Technosoft Logo"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col leading-none select-none">
                <span className="text-[22px] sm:text-[24px] font-extrabold tracking-[-0.02em] text-atlas-navy group-hover:text-atlas-goldDeep transition-colors">
                  ATLAS
                </span>
                <span className="text-[11px] sm:text-[12px] font-bold text-atlas-body uppercase tracking-[0.12em] mt-1">
                  Technosoft
                </span>
              </div>
            </Link>

            {/* Right Side: Desktop Navigation Links + Book a Consultation CTA Button */}
            <div className="hidden xl:flex items-center self-stretch gap-1 2xl:gap-3 ml-auto">
              {/* Desktop Navigation Links with Mega Menu Dropdowns (Font size: 16-17px) */}
              <nav
                className="flex items-stretch self-stretch gap-0.5 2xl:gap-1"
                aria-label="Main Navigation"
                onMouseLeave={handleMouseLeave}
              >
                {NAVIGATION_ITEMS.map((item: NavItem) => {
                  const isActive = activeSection === item.name;
                  const isDropdownOpen = activeDropdown === item.name;

                  return (
                    <div
                      key={item.name}
                      className="flex items-center"
                      onMouseEnter={() => handleMouseEnter(item.name, item.hasDropdown)}
                    >
                      {item.hasDropdown ? (
                        <div className="flex items-center h-full">
                          <Link
                            to={item.href}
                            onClick={() => {
                              setActiveSection(item.name);
                              setActiveDropdown(null);
                            }}
                            className={`group flex items-center gap-1.5 text-[16px] 2xl:text-[17px] font-semibold px-2.5 2xl:px-3.5 py-2.5 rounded-full transition-colors whitespace-nowrap relative focus:outline-none focus-visible:ring-2 focus-visible:ring-atlas-gold ${
                              isActive
                                ? 'text-atlas-navy bg-atlas-gold font-bold shadow-xs'
                                : isDropdownOpen
                                ? 'text-atlas-goldDeep bg-atlas-goldTint'
                                : 'text-atlas-navy hover:text-atlas-goldDeep hover:bg-atlas-mist'
                            }`}
                          >
                            <span>{item.name}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isDropdownOpen ? 'rotate-180 text-atlas-goldDeep' : 'text-slate-500 group-hover:text-atlas-goldDeep'
                              }`}
                            />
                          </Link>

                          {/* Mega Menu Dropdown */}
                          {item.categories && (
                            <div onMouseEnter={() => handleMouseEnter(item.name, true)}>
                              <MegaMenuDropdown
                                menuName={item.name}
                                categories={item.categories}
                                isOpen={isDropdownOpen}
                                onClose={() => setActiveDropdown(null)}
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.href}
                          onClick={() => {
                            setActiveSection(item.name);
                            setActiveDropdown(null);
                          }}
                          className={`block text-[16px] 2xl:text-[17px] font-semibold px-2.5 2xl:px-3.5 py-2.5 rounded-full transition-colors whitespace-nowrap relative focus:outline-none focus-visible:ring-2 focus-visible:ring-atlas-gold ${
                            isActive
                              ? 'text-atlas-navy bg-atlas-gold font-bold shadow-xs'
                              : 'text-atlas-navy hover:text-atlas-goldDeep hover:bg-atlas-mist'
                          }`}
                        >
                          <span>{item.name}</span>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Book a Consultation Button (Extreme Right) */}
              <div className="pl-1 xl:pl-2 shrink-0 flex items-center">
                <button
                  type="button"
                  onClick={() => setIsCallbackModalOpen(true)}
                  aria-label="Request a callback"
                  className="hidden min-[1720px]:inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-[15px] sm:text-[16px] font-bold text-atlas-navy bg-white border-[1.5px] border-atlas-lineStrong hover:border-atlas-navy transition-all duration-200 cursor-pointer active:scale-[0.98] group mr-2 shrink-0"
                  title="Schedule a direct phone callback with our consultants"
                >
                  <PhoneCall className="w-4 h-4 text-atlas-goldDeep" />
                  <span>Request Callback</span>
                </button>
                <Button
                  href={location.pathname === '/contact' ? '#contact-form' : '/contact'}
                  variant="gold"
                  size="md"
                  className="!text-[15px] 2xl:!text-[16px] font-bold px-5 py-2.5 whitespace-nowrap shrink-0 !bg-atlas-gold hover:!bg-[#D4972F] !text-atlas-navy shadow-[0_4px_14px_rgba(224,163,59,0.35)]"
                  icon={<ArrowRight className="w-4 h-4 text-atlas-navy" />}
                >
                  Book a Consultation
                </Button>
              </div>
            </div>

            {/* Mobile / Tablet Menu Hamburger Button */}
            <div className="flex items-center xl:hidden ml-auto">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer with Expandable Accordions */}
      {isMobileMenuOpen && (
        <div className="animate-fade-in fixed inset-0 z-50 xl:hidden flex flex-col justify-between bg-white">
          {/* Mobile Top Bar with Logo & Close */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white shadow-xs">
            <Link
              to="/"
              className="flex items-center gap-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-14 h-12 sm:w-16 sm:h-14 shrink-0 flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="ATLAS Technosoft Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[20px] font-extrabold text-atlas-navy">ATLAS</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-atlas-body mt-0.5">Technosoft</span>
              </div>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Mobile Accordion Menu Body */}
          <div className="px-5 py-5 overflow-y-auto flex-1">
            <div className="mb-3 text-[12px] font-bold uppercase tracking-wider text-slate-500">
              Navigation Menu
            </div>
            
            <nav className="space-y-1">
              {NAVIGATION_ITEMS.map((item) => {
                const isExpanded = mobileExpandedItem === item.name;
                const isActive = activeSection === item.name;

                if (item.hasDropdown && item.categories) {
                  return (
                    <div key={item.name} className="border-b border-slate-100 py-1">
                      {/* Accordion Header with Dedicated Page Link and Chevron Button */}
                      <div className="flex items-center justify-between py-2">
                        <Link
                          to={item.href}
                          onClick={() => {
                            setActiveSection(item.name);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`text-[17px] font-medium transition-colors ${
                            isActive
                              ? 'text-atlas-goldDeep font-semibold'
                              : 'text-[#0A1B4F] hover:text-atlas-goldDeep'
                          }`}
                        >
                          <span>{item.name}</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleMobileAccordion(item.name)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-atlas-goldDeep hover:bg-slate-100 transition-colors"
                          aria-expanded={isExpanded}
                          aria-label={`Toggle ${item.name} subcategories`}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-atlas-goldDeep" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-500" />
                          )}
                        </button>
                      </div>

                      {/* Accordion Content */}
                      {isExpanded && (
                        <div className="pl-2 pr-1 pb-3 pt-1 space-y-3 bg-white rounded-xl my-1">
                          {item.categories.map((cat) => {
                            const IconComponent = iconMap[cat.icon] || Settings;
                            return (
                              <div key={cat.id} className="space-y-1.5 pt-1">
                                {/* Category Header Link */}
                                <Link
                                  to={cat.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center gap-2 text-[14px] font-bold text-[#0A1B4F] hover:text-atlas-goldDeep"
                                >
                                  <IconComponent className="w-4 h-4 text-atlas-goldDeep" />
                                  <span>{cat.name}</span>
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 ml-auto" />
                                </Link>

                                {/* Category Sub-items */}
                                <div className="pl-6 space-y-1 border-l-2 border-amber-200/60 ml-2">
                                  {cat.subItems.map((sub, sIdx) => (
                                    <Link
                                      key={sIdx}
                                      to={sub.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="block py-1 text-[13px] text-slate-600 hover:text-atlas-goldDeep"
                                    >
                                      {sub.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                // Standard link without dropdown
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => {
                      setActiveSection(item.name);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between py-3 text-[17px] border-b border-slate-100 transition-colors ${
                      isActive
                        ? 'text-atlas-goldDeep font-semibold'
                        : 'text-[#0A1B4F] font-medium hover:text-atlas-goldDeep'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="w-5 h-5 text-slate-500" />
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Contact & Partner Info */}
            <div className="mt-6 pt-5 border-t border-slate-200 space-y-3.5">
              <div className="text-[13.5px] text-slate-600 space-y-1.5">
                <div className="font-semibold text-slate-900">
                  Authorized SAP Channel Partner
                </div>
                <div>Boyum IT Silver | UiPath Silver Partner</div>
                
                <div className="pt-2 space-y-1">
                  <a
                    href={TOP_BAR_INFO.phoneTel}
                    className="flex items-center gap-2 text-[#0A1B4F] font-medium"
                  >
                    <Phone className="w-3.5 h-3.5 text-atlas-goldDeep" />
                    <span>{TOP_BAR_INFO.phone}</span>
                  </a>
                  <a
                    href={TOP_BAR_INFO.emailMailto}
                    className="flex items-center gap-2 text-[#0A1B4F] font-medium"
                  >
                    <Mail className="w-3.5 h-3.5 text-atlas-goldDeep" />
                    <span>{TOP_BAR_INFO.email}</span>
                  </a>
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-atlas-goldDeep" />
                    <span>{TOP_BAR_INFO.location}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCallbackModalOpen(true);
                }}
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 rounded-full text-atlas-navy font-bold text-[15px] bg-white border-[1.5px] border-atlas-navy hover:bg-atlas-mist transition-all cursor-pointer mb-2.5"
              >
                <PhoneCall className="w-4 h-4 text-atlas-goldDeep" />
                <span>Request a Callback</span>
              </button>

              <Button
                href={location.pathname === '/contact' ? '#contact-form' : '/contact'}
                variant="gold"
                fullWidth
                size="lg"
                className="text-[16px] py-3.5"
                onClick={() => setIsMobileMenuOpen(false)}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Book a Consultation
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reusable Enterprise Callback Modal */}
      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
      />
    </>
  );
};
