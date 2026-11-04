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
  Linkedin
} from 'lucide-react';
import { Button } from '../ui/Button';
import { TopInfoBar } from './TopInfoBar';
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
};

export const SiteHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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
      {/* Top Information Bar */}
      <TopInfoBar />

      {/* Main Sticky Navigation Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-[84px] w-full">
            
            {/* Left Side: Brand Logo & Company Name */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1 shrink-0"
              onClick={() => setActiveDropdown(null)}
            >
              <div className="relative h-12 w-14 shrink-0 flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="ATLAS Technosoft Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-none select-none">
                <span className="text-[22px] sm:text-[24px] font-black tracking-tight text-[#10264b] group-hover:text-[#1B72E8] transition-colors">
                  ATLAS
                </span>
                <span className="text-[13px] sm:text-[14px] font-bold text-[#10264b] tracking-normal mt-0.5">
                  Technosoft
                </span>
              </div>
            </Link>

            {/* Right Side: Desktop Navigation Links + Book a Consultation CTA Button */}
            <div className="hidden xl:flex items-center gap-2 2xl:gap-4 ml-auto">
              {/* Desktop Navigation Links with Mega Menu Dropdowns */}
              <nav
                className="flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 relative"
                aria-label="Main Navigation"
                onMouseLeave={handleMouseLeave}
              >
                {NAVIGATION_ITEMS.map((item: NavItem) => {
                  const isActive = activeSection === item.name;
                  const isDropdownOpen = activeDropdown === item.name;

                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(item.name, item.hasDropdown)}
                    >
                      {item.hasDropdown ? (
                        <div className="relative flex items-center">
                          <Link
                            to={item.href}
                            onClick={() => {
                              setActiveSection(item.name);
                              setActiveDropdown(null);
                            }}
                            className={`group flex items-center gap-1 text-[14.5px] xl:text-[15px] 2xl:text-[15.5px] font-medium px-2.5 2xl:px-3 py-2 rounded-lg transition-colors whitespace-nowrap relative focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                              isActive
                                ? 'text-[#0066CC] font-semibold'
                                : isDropdownOpen
                                ? 'text-[#1B72E8] font-semibold bg-blue-50/70'
                                : 'text-[#142B59] hover:text-[#0066CC] hover:bg-slate-50/80'
                            }`}
                          >
                            <span>{item.name}</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isDropdownOpen ? 'rotate-180 text-[#1B72E8]' : 'text-slate-400 group-hover:text-[#0066CC]'
                              }`}
                            />
                            {isActive && (
                              <span className="absolute bottom-0.5 left-2.5 right-2.5 h-0.5 rounded-full bg-gradient-to-r from-[#0052CC] to-[#0A66C2]" />
                            )}
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
                          className={`block text-[14.5px] xl:text-[15px] 2xl:text-[15.5px] font-medium px-2.5 2xl:px-3 py-2 rounded-lg transition-colors whitespace-nowrap relative focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                            isActive
                              ? 'text-[#0066CC] font-semibold'
                              : 'text-[#142B59] hover:text-[#0066CC] hover:bg-slate-50/80'
                          }`}
                        >
                          <span>{item.name}</span>
                          {isActive && (
                            <span className="absolute bottom-0.5 left-2.5 right-2.5 h-0.5 rounded-full bg-gradient-to-r from-[#0052CC] to-[#0A66C2]" />
                          )}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Book a Consultation Button (Extreme Right) */}
              <div className="pl-1 xl:pl-2 shrink-0">
                <Button
                  href={location.pathname === '/contact' ? '#contact-form' : '/contact'}
                  variant="gold"
                  size="md"
                  className="text-[14.5px] 2xl:text-[15px] font-semibold px-4 xl:px-5 py-2.5 rounded-lg text-white bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] shadow-sm shadow-blue-500/20 whitespace-nowrap shrink-0"
                  icon={<ArrowRight className="w-4 h-4" />}
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
        <div className="fixed inset-0 z-50 xl:hidden flex flex-col justify-between bg-white">
          {/* Mobile Top Bar with Logo & Close */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white shadow-xs">
            <Link
              to="/"
              className="flex items-center gap-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-12 h-10 shrink-0 flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="ATLAS Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[20px] font-black text-slate-900">ATLAS</span>
                <span className="text-[12px] font-bold text-slate-800">Technosoft</span>
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
            <div className="mb-3 text-[12px] font-bold uppercase tracking-wider text-slate-400">
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
                              ? 'text-[#1B72E8] font-semibold'
                              : 'text-[#142B59] hover:text-[#1B72E8]'
                          }`}
                        >
                          <span>{item.name}</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleMobileAccordion(item.name)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#1B72E8] hover:bg-slate-100 transition-colors"
                          aria-expanded={isExpanded}
                          aria-label={`Toggle ${item.name} subcategories`}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-[#1B72E8]" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </button>
                      </div>

                      {/* Accordion Content */}
                      {isExpanded && (
                        <div className="pl-2 pr-1 pb-3 pt-1 space-y-3 bg-slate-50/70 rounded-xl my-1">
                          {item.categories.map((cat) => {
                            const IconComponent = iconMap[cat.icon] || Settings;
                            return (
                              <div key={cat.id} className="space-y-1.5 pt-1">
                                {/* Category Header Link */}
                                <Link
                                  to={cat.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center gap-2 text-[14px] font-bold text-[#142B59] hover:text-[#1B72E8]"
                                >
                                  <IconComponent className="w-4 h-4 text-[#1B72E8]" />
                                  <span>{cat.name}</span>
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-auto" />
                                </Link>

                                {/* Category Sub-items */}
                                <div className="pl-6 space-y-1 border-l-2 border-blue-200/60 ml-2">
                                  {cat.subItems.map((sub, sIdx) => (
                                    <Link
                                      key={sIdx}
                                      to={sub.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="block py-1 text-[13px] text-slate-600 hover:text-[#1B72E8]"
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
                        ? 'text-[#1B72E8] font-semibold'
                        : 'text-[#142B59] font-medium hover:text-[#1B72E8]'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
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
                    className="flex items-center gap-2 text-[#142B59] font-medium"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>{TOP_BAR_INFO.phone}</span>
                  </a>
                  <a
                    href={TOP_BAR_INFO.emailMailto}
                    className="flex items-center gap-2 text-[#142B59] font-medium"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>{TOP_BAR_INFO.email}</span>
                  </a>
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{TOP_BAR_INFO.location}</span>
                  </div>
                </div>
              </div>

              <Button
                href={location.pathname === '/contact' ? '#contact-form' : '/contact'}
                variant="gold"
                fullWidth
                size="lg"
                className="text-[16px] font-semibold py-3 text-white bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] shadow-sm"
                onClick={() => setIsMobileMenuOpen(false)}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Book a Consultation
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
