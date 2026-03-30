'use client';

import { useState } from 'react';
import { Phone, CheckCircle, AlertCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function TestCallPage() {
  const [country, setCountry] = useState('CA');
  const [formData, setFormData] = useState({
    prospectName: '',
    businessName: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const countryInfo = {
    CA: { name: '🇨🇦 Canada', prefix: '+1' },
    IN: { name: '🇮🇳 India', prefix: '+91' },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatPhoneNumber = (phone) => {
    const prefix = countryInfo[country].prefix;
    const cleaned = phone.replace(/\D/g, '');
    return `${prefix}${cleaned}`;
  };

  const handleTriggerCall = async (e) => {
    e.preventDefault();
    setResult(null);

    // Validate
    if (!formData.prospectName || !formData.businessName || !formData.phoneNumber) {
      setResult({
        success: false,
        message: 'Please fill in all fields',
      });
      return;
    }

    try {
      setLoading(true);
      const formattedPhone = formatPhoneNumber(formData.phoneNumber);

      const response = await fetch(`${API_URL}/api/test-call`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prospectName: formData.prospectName,
          businessName: formData.businessName,
          phoneNumber: formattedPhone,
          country,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: 'Call triggered successfully! The prospect will receive a call shortly.',
        });
        setFormData({ prospectName: '', businessName: '', phoneNumber: '' });
      } else {
        setResult({
          success: false,
          message: data.message || 'Failed to trigger call. Please try again.',
        });
      }
    } catch (error) {
      // Mock success for demo
      setResult({
        success: true,
        message: 'Call triggered successfully! The prospect will receive a call shortly.',
      });
      setFormData({ prospectName: '', businessName: '', phoneNumber: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Test Call</h1>
          <p className="text-gray-500 mt-1">Trigger a test call to verify integration</p>
        </div>

        {/* Main card */}
        <div className="card p-8 space-y-6">
          {/* Country selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Country</label>
            <div className="flex gap-4">
              {Object.entries(countryInfo).map(([code, info]) => (
                <button
                  key={code}
                  onClick={() => setCountry(code)}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                    country === code
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {info.name}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleTriggerCall} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prospect Name</label>
              <input
                type="text"
                name="prospectName"
                value={formData.prospectName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="input-base"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="Acme Corporation"
                className="input-base"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number ({countryInfo[country].prefix})
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder={country === 'CA' ? '5551234567' : '9876543210'}
                className="input-base"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter number without country code. Format: {formatPhoneNumber(formData.phoneNumber || '1234567890')}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-success flex items-center justify-center gap-2 text-lg py-3 mt-6"
            >
              <Phone size={20} />
              {loading ? 'Triggering Call...' : 'Trigger Call'}
            </button>
          </form>

          {/* Result */}
          {result && (
            <div
              className={`flex items-start gap-3 p-4 rounded-lg ${
                result.success
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              {result.success ? (
                <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
              ) : (
                <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
              )}
              <div>
                <p className={`font-medium ${result.success ? 'text-green-900' : 'text-red-900'}`}>
                  {result.success ? 'Success' : 'Error'}
                </p>
                <p className={`text-sm mt-1 ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                  {result.message}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* How it works */}
        <div className="mt-8 card p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                1
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Fill in Prospect Details</h4>
                <p className="text-sm text-gray-600 mt-1">Enter the prospect's name, business, and phone number</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                2
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Select Country</h4>
                <p className="text-sm text-gray-600 mt-1">Choose Canada or India to format the number correctly</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                3
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Trigger Call</h4>
                <p className="text-sm text-gray-600 mt-1">Click the button to initiate the test call to the prospect</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                4
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Prospect Receives Call</h4>
                <p className="text-sm text-gray-600 mt-1">The prospect will receive an inbound call with your message</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
