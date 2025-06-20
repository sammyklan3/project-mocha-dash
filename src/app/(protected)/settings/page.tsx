import React from "react";
import {
  Settings as SettingsIcon,
  Shield,
  Globe,
  Bell,
  Key,
  Database,
} from "lucide-react";

const Settings: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Configure your ProjectMochaChai platform
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">
                Blockchain Configuration
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Network
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>Scroll Mainnet</option>
                  <option>Scroll Testnet</option>
                  <option>Ethereum Mainnet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  RPC Endpoint
                </label>
                <input
                  type="text"
                  value="https://rpc.scroll.io"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contract Address
                </label>
                <input
                  type="text"
                  value="0x742d35Cc6cF3e8d7E1dC0ebCFE5D1C5B8d3A2e3F"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Key className="h-6 w-6 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-900">
                API Configuration
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Base URL
                </label>
                <input
                  type="text"
                  value="https://api.projectmochachai.com/v1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <div className="flex space-x-2">
                  <input
                    type="password"
                    value="pk_live_1234567890abcdef"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
                  />
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Regenerate
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook URL
                </label>
                <input
                  type="text"
                  placeholder="https://your-domain.com/webhook"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Notifications</h3>
            </div>

            <div className="space-y-4">
              {[
                {
                  label: "New Orders",
                  description: "Get notified when new orders are placed",
                },
                {
                  label: "Low Stock Alerts",
                  description: "Receive alerts when products are running low",
                },
                {
                  label: "NFT Mint Notifications",
                  description: "Notifications for successful NFT mints",
                },
                {
                  label: "Customer Reviews",
                  description: "Get notified about new customer reviews",
                },
                {
                  label: "System Updates",
                  description: "Important system and security updates",
                },
              ].map((notification, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {notification.label}
                    </p>
                    <p className="text-sm text-gray-600">
                      {notification.description}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked={index < 3}
                      className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="h-6 w-6 text-red-600" />
              <h3 className="text-xl font-bold text-gray-900">Security</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-900 mb-2">
                  Two-Factor Authentication
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600">Enabled</span>
                  <button className="text-sm text-blue-600 hover:underline">
                    Configure
                  </button>
                </div>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-2">
                  Session Timeout
                </p>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                </select>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-2">IP Whitelist</p>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="192.168.1.0/24"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                  <button className="text-sm text-amber-600 hover:underline">
                    Add IP Range
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Database className="h-6 w-6 text-indigo-600" />
              <h3 className="text-xl font-bold text-gray-900">
                Data & Storage
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Database Size</span>
                <span className="font-medium">2.4 GB</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Backup Frequency</span>
                <span className="font-medium">Daily</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Last Backup</span>
                <span className="font-medium text-green-600">2 hours ago</span>
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors">
                Download Backup
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <SettingsIcon className="h-6 w-6 text-gray-600" />
              <h3 className="text-xl font-bold text-gray-900">System Info</h3>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Version</span>
                <span className="font-medium">v2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Uptime</span>
                <span className="font-medium text-green-600">99.9%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Update</span>
                <span className="font-medium">Jan 10, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="font-medium text-green-600">
                  All Systems Operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          Reset to Defaults
        </button>
        <button className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
