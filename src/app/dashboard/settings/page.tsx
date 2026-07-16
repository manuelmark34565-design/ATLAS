'use client';

import { AVAILABLE_MODELS, getActiveModel, calculateCost } from '@/lib/ai/model-config';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [models, setModels] = useState(AVAILABLE_MODELS);
  const [activeModel, setActiveModel] = useState(getActiveModel());
  const [usage, setUsage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<'models' | 'usage' | 'logs'>('models');

  useEffect(() => {
    fetchUsage();
  }, []);

  const fetchUsage = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings?endpoint=usage');
      const data = await res.json();
      setUsage(data.stats);
    } catch (err) {
      setError('Failed to fetch usage data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const switchModel = async (modelId: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'switch-model', modelId }),
      });

      if (res.ok) {
        const newActive = models.find((m) => m.id === modelId);
        if (newActive) {
          setActiveModel(newActive);
        }
      }
    } catch (err) {
      setError('Failed to switch model');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-[#0F172A] border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 mb-4 inline-block">
            ← Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ATLAS Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage AI models and track usage</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setTab('models')}
            className={`px-4 py-3 font-medium transition ${
              tab === 'models'
                ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            AI Models
          </button>
          <button
            onClick={() => setTab('usage')}
            className={`px-4 py-3 font-medium transition ${
              tab === 'usage'
                ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Token Usage
          </button>
          <button
            onClick={() => setTab('logs')}
            className={`px-4 py-3 font-medium transition ${
              tab === 'logs'
                ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Activity Logs
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Models Tab */}
        {tab === 'models' && (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <p className="text-blue-900 dark:text-blue-200">
                <strong>Active Model:</strong> {activeModel.name}
              </p>
            </div>

            <div className="grid gap-4">
              {models.map((model) => (
                <div
                  key={model.id}
                  className={`border rounded-lg p-6 transition ${
                    model.id === activeModel.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1D2939]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {model.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {model.description}
                      </p>
                    </div>
                    {model.id === activeModel.id && (
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                        Active
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Speed</p>
                      <div className="flex gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1.5 w-6 rounded ${
                              i < model.speedRating
                                ? 'bg-blue-500'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Quality</p>
                      <div className="flex gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1.5 w-6 rounded ${
                              i < model.qualityRating
                                ? 'bg-purple-500'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Max Tokens</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                        {(model.maxTokens / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Pricing</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                        ${model.costPerMillionInputTokens.toFixed(2)}/M in
                      </p>
                    </div>
                  </div>

                  {model.id !== activeModel.id && (
                    <button
                      onClick={() => switchModel(model.id)}
                      disabled={loading}
                      className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition disabled:opacity-50"
                    >
                      {loading ? 'Switching...' : 'Switch to this model'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Usage Tab */}
        {tab === 'usage' && (
          <div className="space-y-6">
            {usage ? (
              <>
                {/* Today's Usage */}
                <div className="bg-white dark:bg-[#1D2939] rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Today's Usage
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Input Tokens</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {usage.today.inputTokens?.toLocaleString() || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Output Tokens</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {usage.today.outputTokens?.toLocaleString() || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Requests</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {usage.today.requestCount || 0}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Monthly Usage */}
                <div className="bg-white dark:bg-[#1D2939] rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Last 30 Days
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Tokens</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {usage.monthly.totalTokens?.toLocaleString() || 0}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Est. Cost: ${calculateCost(activeModel, usage.monthly.inputTokens || 0, usage.monthly.outputTokens || 0).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Requests</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {usage.monthly.requestCount || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Tokens/Request</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {usage.monthly.requestCount
                          ? Math.round(usage.monthly.totalTokens / usage.monthly.requestCount)
                          : 0}
                      </p>
                    </div>
                  </div>
                </div>

                {/* History Chart Placeholder */}
                <div className="bg-white dark:bg-[#1D2939] rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Last 7 Days
                  </h3>
                  <div className="space-y-2">
                    {usage.history?.map((day: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{day.date}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {day.totalTokens.toLocaleString()} tokens
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {day.requestCount} requests
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                {loading ? 'Loading usage data...' : 'No usage data available'}
              </p>
            )}
          </div>
        )}

        {/* Logs Tab */}
        {tab === 'logs' && (
          <div className="bg-white dark:bg-[#1D2939] rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Activity Logs
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Real-time activity logs showing AI operations, errors, and system events.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded p-4 font-mono text-xs text-gray-700 dark:text-gray-300 h-96 overflow-y-auto">
              <p className="text-gray-500 dark:text-gray-400">
                Activity logs will appear here. The system is tracking all AI operations and errors in real-time.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
