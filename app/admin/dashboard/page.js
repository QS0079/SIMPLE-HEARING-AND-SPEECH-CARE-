'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const router = useRouter();

  const [leads, setLeads] = useState([]);
  const [counts, setCounts] = useState({ total: 0, new: 0, contacted: 0, scheduled: 0, completed: 0, cancelled: 0 });
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);

  // Detail Modal
  const [selectedLead, setSelectedLead] = useState(null);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  // Admin User & UI States
  const [adminEmail, setAdminEmail] = useState('simplehearing@gmail.com');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');

  // Multi-select & Deletion States
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [leadToDeleteSingle, setLeadToDeleteSingle] = useState(null);

  // Auto-refresh countdown (10s)
  const [countdown, setCountdown] = useState(10);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const fetchLeads = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams({
        search,
        status: statusFilter,
        sort: sortOrder,
        page: currentPage.toString(),
        limit: '10',
      });

      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      if (res.status === 401) {
        router.push('/login');
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch leads');
      }

      setLeads(data.leads || []);
      setCounts(data.counts || { total: 0, new: 0, contacted: 0, scheduled: 0, completed: 0, cancelled: 0 });
      setPagination(data.pagination || { total: 0, page: 1, limit: 10, totalPages: 1 });
    } catch (err) {
      if (!isSilent) {
        setError(err.message || 'Error fetching leads');
      }
    } finally {
      if (!isSilent) setLoading(false);
    }
  }, [search, statusFilter, sortOrder, currentPage, router]);

  // Initial fetch
  useEffect(() => {
    fetchLeads(false);
  }, [fetchLeads]);

  // Live Auto-refresh countdown: ticks down every 1 second
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // When countdown reaches 0, trigger background auto-refresh and reset back to 10s
  useEffect(() => {
    if (countdown === 0) {
      fetchLeads(true);
      setCountdown(10);
    }
  }, [countdown, fetchLeads]);

  const handleManualRefresh = () => {
    setCountdown(10);
    fetchLeads(false);
  };

  // Fetch current admin info
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.admin?.email) setAdminEmail(data.admin.email);
      })
      .catch(() => {});
  }, []);

  const handleStatusChange = async (leadId, newStatus) => {
    setUpdatingStatusId(leadId);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to update status');
        return;
      }

      // Update in local state
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus, updatedAt: new Date().toISOString() } : l))
      );
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead((prev) => ({ ...prev, status: newStatus }));
      }

      // Refetch stats
      fetchLeads();
    } catch (err) {
      console.error('Status update failed:', err);
      alert('Error updating status');
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      router.push('/login');
      router.refresh();
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '—';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  const getInitials = (name) => {
    if (!name) return 'PT';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleCopyPhone = (phone) => {
    if (!phone) return;
    try {
      navigator.clipboard.writeText(phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      // fallback
    }
  };

  const allOnPageSelected = leads.length > 0 && leads.every((l) => selectedLeadIds.includes(l.id));

  const toggleSelectAll = () => {
    if (allOnPageSelected) {
      setSelectedLeadIds((prev) => prev.filter((id) => !leads.some((l) => l.id === id)));
    } else {
      const visibleIds = leads.map((l) => l.id);
      setSelectedLeadIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const toggleSelectLead = (id) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearSelection = () => {
    setSelectedLeadIds([]);
  };

  const handleDeleteConfirmed = async () => {
    const idsToDelete = leadToDeleteSingle ? [leadToDeleteSingle.id] : selectedLeadIds;
    if (idsToDelete.length === 0) return;

    setIsDeleting(true);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: idsToDelete }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to erase leads from database');
      }

      setSelectedLeadIds((prev) => prev.filter((id) => !idsToDelete.includes(id)));
      setDeleteConfirmOpen(false);
      setLeadToDeleteSingle(null);
      if (selectedLead && idsToDelete.includes(selectedLead.id)) {
        setSelectedLead(null);
      }

      await fetchLeads(false);
    } catch (err) {
      alert(err.message || 'Error deleting leads');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="admin-layout">
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="admin-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Left Sidebar */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'admin-sidebar--open' : ''}`}>
        {/* Brand Section */}
        <div className="admin-sidebar__brand">
          <Link href="/admin/dashboard" className="admin-sidebar__logo">
            <Image
              src="/logo.png"
              alt="Simple Hearing & Speech Care"
              width={185}
              height={46}
              priority
              className="admin-sidebar__logo-img"
            />
          </Link>
          <div className="admin-sidebar__badge-wrap">
            <span className="admin-tag">Admin Lead Portal</span>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="admin-sidebar__nav">
          <div className="admin-nav-group-title">Main Menu</div>

          <button
            type="button"
            className={`admin-nav-item ${activeNav === 'dashboard' ? 'admin-nav-item--active' : ''}`}
            onClick={() => {
              setActiveNav('dashboard');
              setStatusFilter('All');
              setSearch('');
              setMobileMenuOpen(false);
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeNav === 'appointments' ? 'admin-nav-item--active' : ''}`}
            onClick={() => {
              setActiveNav('appointments');
              setMobileMenuOpen(false);
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              <path d="M9 14l2 2 4-4" />
            </svg>
            <span>Appointments</span>
            {counts.new > 0 && (
              <span className="admin-nav-counter">{counts.new} new</span>
            )}
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeNav === 'leads' ? 'admin-nav-item--active' : ''}`}
            onClick={() => {
              setActiveNav('leads');
              setStatusFilter('New');
              setSearch('');
              setMobileMenuOpen(false);
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Pending Leads</span>
            <span className="admin-nav-pill">{counts.new}</span>
          </button>

          <div className="admin-nav-group-title">Quick Actions</div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-nav-item"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>View Live Website</span>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 'auto', opacity: 0.6 }}>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </nav>

        {/* Sidebar Footer & User Profile */}
        <div className="admin-sidebar__footer">
          <div className="admin-user-info">
            <div className="admin-avatar">
              <span>SH</span>
            </div>
            <div className="admin-user-meta">
              <div className="admin-user-name" title={adminEmail}>{adminEmail}</div>
              <div className="admin-user-role">Clinic Administrator</div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="admin-sidebar__logout-btn"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Shell (Right Side - Full Width) */}
      <div className="admin-shell">
        {/* Full-width Topbar */}
        <header className="admin-topbar">
          <div className="admin-topbar__left">
            <button
              type="button"
              className="admin-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Sidebar"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <div className="admin-breadcrumbs">
              <span className="admin-breadcrumb-root">SimpleHearing</span>
              <span className="admin-breadcrumb-sep">/</span>
              <span className="admin-breadcrumb-curr">Patient Lead Management</span>
            </div>
          </div>

          <div className="admin-topbar__right">
            <button
              type="button"
              onClick={handleManualRefresh}
              className="admin-unified-refresh-btn"
              disabled={loading}
              title="Auto-refreshes every 10 seconds. Click to refresh now."
            >
              <span className="admin-live-dot" aria-hidden="true" />
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                className={loading ? 'admin-spin' : ''}
                aria-hidden="true"
              >
                <path d="M23 4v6h-6M1 20v-6h6" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
              {!loading && (
                <span className="admin-unified-refresh-countdown">{countdown}s</span>
              )}
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline btn--sm admin-view-site-btn"
            >
              View Website ↗
            </a>
          </div>
        </header>

        {/* Full-width Main Content */}
        <main className="admin-content">
          {/* Welcome / Header Section */}
          <div className="admin-header-row">
            <div>
              <h1 className="admin-title">Patient Lead Management</h1>
              <p className="admin-subtitle">
                Live consultation requests and appointments submitted via the landing page.
              </p>
            </div>

            <div className="admin-header-meta">
              <span className="admin-lead-counter-pill">
                Showing <strong>{leads.length}</strong> of <strong>{pagination.total}</strong> records
              </span>
            </div>
          </div>

        {/* 4 Summary Cards */}
        <section className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-card__icon admin-stat-card__icon--total">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="admin-stat-card__content">
              <span className="admin-stat-card__label">Total Leads</span>
              <strong className="admin-stat-card__val">{counts.total}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-card__icon admin-stat-card__icon--new">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="admin-stat-card__content">
              <span className="admin-stat-card__label">New / Pending</span>
              <strong className="admin-stat-card__val text-teal">{counts.new}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-card__icon admin-stat-card__icon--contacted">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="admin-stat-card__content">
              <span className="admin-stat-card__label">Contacted</span>
              <strong className="admin-stat-card__val text-amber">{counts.contacted}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-card__icon admin-stat-card__icon--completed">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="admin-stat-card__content">
              <span className="admin-stat-card__label">Completed</span>
              <strong className="admin-stat-card__val text-green">{counts.completed}</strong>
            </div>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <div className="admin-controls-card">
          <div className="admin-search-wrap">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by patient name, phone, or service..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="admin-search-input"
            />
            {search && (
              <button type="button" onClick={() => setSearch('')} className="admin-search-clear">
                ×
              </button>
            )}
          </div>

          <div className="admin-filters-group">
            <div className="admin-select-wrap">
              <label htmlFor="filter-status">Status:</label>
              <select
                id="filter-status"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="admin-select-wrap">
              <label htmlFor="filter-sort">Sort:</label>
              <select
                id="filter-sort"
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leads Table Container */}
        <div className="admin-table-card">
          {error && (
            <div className="admin-alert admin-alert--danger" style={{ margin: '16px' }}>
              <span>{error}</span>
            </div>
          )}

          {/* Bulk Action Bar when rows are selected */}
          {selectedLeadIds.length > 0 && (
            <div className="admin-bulk-bar">
              <div className="admin-bulk-bar__info">
                <span className="admin-bulk-badge">{selectedLeadIds.length}</span>
                <span>lead{selectedLeadIds.length > 1 ? 's' : ''} selected</span>
              </div>
              <div className="admin-bulk-bar__actions">
                <button
                  type="button"
                  onClick={clearSelection}
                  className="btn btn--white btn--sm"
                  disabled={isDeleting}
                >
                  Clear Selection
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLeadToDeleteSingle(null);
                    setDeleteConfirmOpen(true);
                  }}
                  className="btn btn--danger btn--sm"
                  disabled={isDeleting}
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                  <span>Permanently Delete ({selectedLeadIds.length})</span>
                </button>
              </div>
            </div>
          )}

          {loading && leads.length === 0 ? (
            <div className="admin-table-empty">
              <span className="admin-spinner" style={{ width: '28px', height: '28px' }} />
              <p>Loading patient appointment leads...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="admin-table-empty">
              <div className="admin-empty-icon">📋</div>
              <h4>No Leads Found</h4>
              <p>
                {search || statusFilter !== 'All'
                  ? 'No appointment leads matched your filter criteria. Try clearing search or status filters.'
                  : 'No appointment leads have been submitted yet. Submissions from the website will automatically appear here.'}
              </p>
            </div>
          ) : (
            <div className="admin-table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th style={{ width: '42px', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={allOnPageSelected}
                        onChange={toggleSelectAll}
                        className="admin-table-checkbox"
                        aria-label="Select all leads on current page"
                      />
                    </th>
                    <th style={{ width: '60px' }}>ID</th>
                    <th>Patient Details</th>
                    <th>Phone</th>
                    <th>Service</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => {
                    const isSelected = selectedLeadIds.includes(lead.id);
                    return (
                      <tr
                        key={lead.id}
                        className={`${lead.status === 'New' ? 'row-new' : ''} ${isSelected ? 'row-selected' : ''}`}
                      >
                        <td style={{ width: '42px', textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectLead(lead.id)}
                            className="admin-table-checkbox"
                            aria-label={`Select lead ${lead.fullName}`}
                          />
                        </td>
                        <td className="lead-id">#{lead.id}</td>
                        <td>
                          <div className="lead-patient">
                            <span className="lead-name">{lead.fullName}</span>
                            {lead.forWhom && (
                              <span className="lead-for-badge">{lead.forWhom}</span>
                            )}
                          </div>
                        </td>
                        <td>
                          <a href={`tel:${lead.phoneNumber}`} className="lead-phone-link">
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <span>{lead.phoneNumber}</span>
                          </a>
                        </td>
                        <td>
                          <span className="lead-service-badge">{lead.service || 'General'}</span>
                        </td>
                        <td className="lead-date">{formatDate(lead.createdAt)}</td>
                        <td>
                          <select
                            value={lead.status}
                            disabled={updatingStatusId === lead.id}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className={`status-badge status-badge--${lead.status.toLowerCase()}`}
                          >
                            <option value="New">● New</option>
                            <option value="Contacted">● Contacted</option>
                            <option value="Scheduled">● Scheduled</option>
                            <option value="Completed">● Completed</option>
                            <option value="Cancelled">● Cancelled</option>
                          </select>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="lead-actions-cell">
                            <button
                              type="button"
                              onClick={() => setSelectedLead(lead)}
                              className="btn btn--outline btn--sm lead-view-btn"
                            >
                              View Details
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setLeadToDeleteSingle(lead);
                                setDeleteConfirmOpen(true);
                              }}
                              className="lead-delete-icon-btn"
                              title="Delete lead permanently"
                              aria-label={`Delete lead ${lead.fullName}`}
                            >
                              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                <line x1="10" y1="11" x2="10" y2="17" />
                                <line x1="14" y1="11" x2="14" y2="17" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Footer */}
          {pagination.totalPages > 1 && (
            <div className="admin-pagination">
              <span className="admin-pagination__info">
                Showing {((pagination.page - 1) * pagination.limit) + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} leads
              </span>
              <div className="admin-pagination__buttons">
                <button
                  type="button"
                  className="btn btn--white btn--sm"
                  disabled={pagination.page <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  ← Previous
                </button>
                <span className="admin-pagination__current">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  type="button"
                  className="btn btn--white btn--sm"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedLead(null)}>
          <div
            className="admin-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="admin-modal-card__header">
              <div className="admin-modal-header-profile">
                <div className="admin-modal-avatar">
                  {getInitials(selectedLead.fullName)}
                </div>
                <div className="admin-modal-header-text">
                  <div className="admin-modal-header-meta">
                    <span className="admin-modal-lead-tag">Lead #{selectedLead.id}</span>
                    <span className={`status-pill status-pill--${selectedLead.status.toLowerCase()}`}>
                      ● {selectedLead.status}
                    </span>
                  </div>
                  <h3 className="admin-modal-title">{selectedLead.fullName}</h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="admin-modal-close"
                aria-label="Close modal"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="admin-modal-card__body">
              <div className="admin-modal-info-grid">
                {/* Phone */}
                <div className="admin-info-item">
                  <span className="admin-info-label">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Phone Number
                  </span>
                  <div className="admin-info-phone-row">
                    <a href={`tel:${selectedLead.phoneNumber}`} className="admin-info-phone-val">
                      {selectedLead.phoneNumber}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopyPhone(selectedLead.phoneNumber)}
                      className="admin-info-copy-btn"
                      title="Copy phone number"
                    >
                      {copiedPhone ? (
                        <>
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#16a34a" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span style={{ color: '#16a34a', fontSize: '11px', fontWeight: 700 }}>Copied!</span>
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Appointment For */}
                <div className="admin-info-item">
                  <span className="admin-info-label">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Appointment For
                  </span>
                  <div className="admin-info-val admin-info-val--highlight">
                    {selectedLead.forWhom || 'Self / Patient'}
                  </div>
                </div>

                {/* Service Requested */}
                <div className="admin-info-item">
                  <span className="admin-info-label">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v8M8 12h8" />
                    </svg>
                    Service Requested
                  </span>
                  <div className="admin-info-val">
                    <span className="admin-service-badge">
                      {selectedLead.service || 'General Consultation'}
                    </span>
                  </div>
                </div>

                {/* Current Status */}
                <div className="admin-info-item">
                  <span className="admin-info-label">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    Current Status
                  </span>
                  <div className="admin-info-status-select-wrap">
                    <select
                      value={selectedLead.status}
                      onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                      className={`admin-status-dropdown admin-status-dropdown--${selectedLead.status.toLowerCase()}`}
                      disabled={updatingStatusId === selectedLead.id}
                    >
                      <option value="New">● New Lead</option>
                      <option value="Contacted">● Contacted</option>
                      <option value="Scheduled">● Scheduled</option>
                      <option value="Completed">● Completed</option>
                      <option value="Cancelled">● Cancelled</option>
                    </select>
                    {updatingStatusId === selectedLead.id && (
                      <span className="admin-spinner" style={{ width: '14px', height: '14px' }} />
                    )}
                  </div>
                </div>

                {/* Submitted At */}
                <div className="admin-info-item">
                  <span className="admin-info-label">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Submitted At
                  </span>
                  <div className="admin-info-val admin-info-val--subtle">
                    {formatDate(selectedLead.createdAt)}
                  </div>
                </div>

                {/* Last Updated */}
                <div className="admin-info-item">
                  <span className="admin-info-label">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 4v6h-6M1 20v-6h6" />
                      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                    </svg>
                    Last Updated
                  </span>
                  <div className="admin-info-val admin-info-val--subtle">
                    {formatDate(selectedLead.updatedAt)}
                  </div>
                </div>
              </div>

              {/* Patient Message / Concern */}
              <div className="admin-modal-note-card">
                <div className="admin-modal-note-header">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>Patient Message / Concern</span>
                </div>
                <div className="admin-modal-note-body">
                  {selectedLead.message ? (
                    <p className="admin-modal-note-text">{selectedLead.message}</p>
                  ) : (
                    <p className="admin-modal-note-empty">
                      No additional message provided with this appointment request.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="admin-modal-card__footer">
              <button
                type="button"
                onClick={() => {
                  setLeadToDeleteSingle(selectedLead);
                  setDeleteConfirmOpen(true);
                }}
                className="admin-modal-action-btn admin-modal-action-btn--delete"
                title="Permanently erase this lead"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
                <span>Delete Lead</span>
              </button>

              <div className="admin-modal-action-group">
                <a
                  href={`https://wa.me/91${selectedLead.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedLead.fullName}, thank you for reaching out to Simple Hearing & Speech Care Clinic regarding ${selectedLead.service || 'our services'}. How can we assist you today?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-modal-action-btn admin-modal-action-btn--whatsapp"
                  title="WhatsApp Patient"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.075-1.554-.287-.962-.379-1.583-.787-2.317-1.521-.734-.734-1.142-1.355-1.521-2.317-.362-.92-.332-1.242-.287-1.554.05-.333.419-1.026.824-1.17.144-.05.289-.045.419-.015.13.03.26.155.334.334.145.352.496 1.218.539 1.309.044.09.073.195.015.31-.059.115-.088.19-.174.29-.087.1-.183.224-.261.301-.088.087-.18.182-.077.36.103.177.457.755.98 1.221.674.6 1.242.787 1.419.874.177.087.28.073.383-.044.103-.116.442-.513.56-.689.118-.176.236-.147.398-.088.162.059 1.029.485 1.206.574.177.088.295.132.338.206.044.074.044.428-.1 1.002z" />
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.176L2 22l4.981-1.398C8.423 21.493 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.633 0-3.155-.477-4.444-1.304l-.318-.204-2.966.833.829-2.915-.224-.336A8.156 8.156 0 0 1 3.8 12c0-4.521 3.679-8.2 8.2-8.2 4.521 0 8.2 3.679 8.2 8.2 0 4.521-3.679 8.2-8.2 8.2z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`tel:${selectedLead.phoneNumber}`}
                  className="admin-modal-action-btn admin-modal-action-btn--call"
                  title="Call Patient Directly"
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Call Patient</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Permanent Deletion Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="admin-modal-backdrop" onClick={() => !isDeleting && setDeleteConfirmOpen(false)}>
          <div className="admin-modal-card admin-modal-card--danger" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-danger-header">
              <div className="admin-modal-danger-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </div>
              <div>
                <h3>Confirm Permanent Deletion</h3>
              </div>
            </div>

            <div className="admin-modal-danger-body">
              <p>
                {leadToDeleteSingle ? (
                  <>
                    Are you sure you want to permanently erase lead <strong>#{leadToDeleteSingle.id} - {leadToDeleteSingle.fullName}</strong>?
                  </>
                ) : (
                  <>
                    Are you sure you want to permanently erase <strong>{selectedLeadIds.length} selected lead{selectedLeadIds.length > 1 ? 's' : ''}</strong>?
                  </>
                )}
              </p>
              <div style={{ fontSize: '13px', color: '#b91c1c', background: '#fef2f2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #fee2e2' }}>
                ⚠️ <strong>Warning:</strong> This action cannot be undone. The record(s) will be completely erased from your PostgreSQL database.
              </div>
            </div>

            <div className="admin-modal-danger-actions">
              <button
                type="button"
                onClick={() => {
                  setDeleteConfirmOpen(false);
                  setLeadToDeleteSingle(null);
                }}
                className="btn btn--white btn--sm"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirmed}
                className="btn btn--danger btn--sm"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span className="admin-spinner" style={{ width: '14px', height: '14px', borderWidth: '2px' }} />
                    <span>Deleting Lead...</span>
                  </>
                ) : (
                  <span>Yes, Delete Lead{selectedLeadIds.length > 1 && !leadToDeleteSingle ? 's' : ''}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
