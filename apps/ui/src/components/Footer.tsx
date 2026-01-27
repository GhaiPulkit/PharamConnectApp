'use client';
export default function Footer () {
    return (
        <footer className="w-full p-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-24">
            <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
                <div>
                    <img src="/logos/logo.png" alt="PharmaGrid" className="w-12 h-12 mb-4"/>
                    <p className="text-white">India's #1 B2B Pharma Marketplace</p>
                </div>
                <div>
                    <h5 className="font-bold !mb-4">Services</h5>
                    <ul className="space-y-1 text-sm">
                        <li>PCD Franchise</li>
                        <li>Third Party Manufacturing</li>
                        <li>Private Label Manufacturing</li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold !mb-4">Trusted By</h5>
                    <div className="flex space-x-4">
                        <div className="w-20 h-12 bg-white/20 rounded-lg"></div>
                        <div className="w-20 h-12 bg-white/20 rounded-lg"></div>
                    </div>
                </div>
                <div>
                    <h5 className="font-bold !mb-4 space-y-1 text-white">Contact</h5>
                    <ul className="space-y-1">
                        <li>+91 99999 99999</li>
                        <li>contact@pharmagrid.com</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm text-gray-400">
                (©) 2026 PharmaGrid. All rights reserved. | GMP Certified Partners
            </div>
        </footer>
    )
}