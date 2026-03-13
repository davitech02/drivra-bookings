import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import PropertyModal from './components/PropertyModal';
import { getAllProperties, upsertProperty, deleteProperty } from '../../../utils/propertyStorage';

interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  images?: string[];
  type: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  amenities: string[];
  status: 'active' | 'inactive';
}

const toAdminProperty = (p: any): Property => ({
  id: p.id,
  name: p.title || p.name,
  location: p.location,
  price: p.price,
  rating: p.rating,
  image: p.image || p.images?.[0] || '',
  images: p.images || [p.image],
  type: p.type,
  guests: p.guests,
  bedrooms: p.bedrooms,
  bathrooms: p.bathrooms,
  description: p.description || '',
  amenities: p.amenities || [],
  status: 'active',
});

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    setProperties(getAllProperties().map(toAdminProperty));
  }, []);

  const handleAddProperty = () => {
    setEditingProperty(null);
    setIsModalOpen(true);
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  const handleDeleteProperty = (id: string) => {
    const updated = deleteProperty(id);
    setProperties(updated.map(toAdminProperty));
    setDeleteConfirm(null);
  };

  const handleSaveProperty = (property: Property) => {
    const propToSave = editingProperty
      ? property
      : { ...property, id: `prop-${Date.now()}`, status: 'active' as const };

    const updated = upsertProperty(propToSave as any);
    setProperties(updated.map(toAdminProperty));
    setIsModalOpen(false);
    setEditingProperty(null);
  };

  const handleToggleStatus = (id: string) => {
    setProperties(properties.map((p) =>
      p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
    ));
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
            <p className="text-gray-600 mt-1">Manage all property listings</p>
          </div>
          <button
            onClick={handleAddProperty}
            className="bg-[#FF385C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E31C5F] transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-add-line text-xl"></i>
            Add New Property
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Properties</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{properties.length}</p>
              </div>
              <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                <i className="ri-home-4-line text-2xl text-rose-500"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{properties.filter((p) => p.status === 'active').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-2xl text-green-600"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Inactive</p>
                <p className="text-3xl font-bold text-gray-600 mt-1">{properties.filter((p) => p.status === 'inactive').length}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <i className="ri-close-circle-line text-2xl text-gray-600"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg. Price/Night</p>
                <p className="text-3xl font-bold text-[#FF385C] mt-1">
                  R {properties.length > 0 ? Math.round(properties.reduce((s, p) => s + p.price, 0) / properties.length) : 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-2xl text-[#FF385C]"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
                <input
                  type="text"
                  placeholder="Search properties by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {(['all', 'active', 'inactive'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    filterStatus === s ? 'bg-[#FF385C] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)} ({s === 'all' ? properties.length : properties.filter((p) => p.status === s).length})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Properties Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Property', 'Location', 'Type', 'Capacity', 'Price/Night', 'Rating', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-6 py-4 text-sm font-semibold text-gray-900">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{property.name}</p>
                          <p className="text-sm text-gray-600">ID: {property.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <i className="ri-map-pin-line text-gray-400"></i>
                        {property.location}
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className="text-gray-700 capitalize">{property.type}</span></td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">
                        <div>{property.guests} guests</div>
                        <div className="text-gray-500">{property.bedrooms} bed · {property.bathrooms} bath</div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className="font-semibold text-gray-900">R {property.price}</span></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <i className="ri-star-fill text-yellow-400"></i>
                        <span className="font-semibold text-gray-900">{property.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(property.id)}
                        className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer ${
                          property.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {property.status === 'active' ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditProperty(property)}
                          className="w-9 h-9 flex items-center justify-center bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <i className="ri-edit-line text-lg"></i>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(property.id)}
                          className="w-9 h-9 flex items-center justify-center bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <i className="ri-delete-bin-line text-lg"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-home-4-line text-6xl text-gray-300"></i>
              <p className="text-gray-600 mt-4 text-lg">No properties found</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-alert-line text-2xl text-red-600"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Property?</h3>
            <p className="text-sm text-gray-600 text-center mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap">Cancel</button>
              <button onClick={() => handleDeleteProperty(deleteConfirm)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 cursor-pointer whitespace-nowrap">Delete</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <PropertyModal
          property={editingProperty}
          onClose={() => { setIsModalOpen(false); setEditingProperty(null); }}
          onSave={handleSaveProperty}
        />
      )}
    </AdminLayout>
  );
}
