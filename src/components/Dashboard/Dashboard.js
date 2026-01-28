import React, { useState, useEffect } from 'react';
import StatsCard from './StatsCard.js';
import { 
  Users, 
  BookOpen, 
  Users2, 
  GraduationCap, 
  MapPin, 
  Activity,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { STORAGE_KEYS } from '../../utils/constants';
import { getAllRecords } from '../../utils/storage';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalIndividuals: 0,
    totalActivities: 0,
    childrenClasses: 0,
    juniorYouthGroups: 0,
    studyCircles: 0,
    localities: 0,
    latestCycleParticipants: 0,
    completionRate: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on component mount
  useEffect(() => {
    const loadDashboardData = () => {
      try {
        // Load individuals using consistent storage keys
        const individualsData = getAllRecords(STORAGE_KEYS.individuals);
        
        // Load activities
        const childrenClassesData = getAllRecords(STORAGE_KEYS.childrenClasses);
        const juniorYouthGroupsData = getAllRecords(STORAGE_KEYS.juniorYouthGroups);
        const studyCirclesData = getAllRecords(STORAGE_KEYS.studyCircles);
        
        // Load localities
        const localitiesData = getAllRecords(STORAGE_KEYS.localities);
        
        // Calculate statistics
        const totalIndividuals = individualsData.length;
        const totalActivities = childrenClassesData.length + juniorYouthGroupsData.length + studyCirclesData.length;
        
        // Calculate completion rates
        const completedChildrenClasses = childrenClassesData.filter(c => c.status === 'completed').length;
        const completedJuniorYouthGroups = juniorYouthGroupsData.filter(g => g.status === 'completed').length;
        const completedStudyCircles = studyCirclesData.filter(s => s.status === 'completed').length;
        
        const totalCompleted = completedChildrenClasses + completedJuniorYouthGroups + completedStudyCircles;
        const completionRate = totalActivities > 0 ? Math.round((totalCompleted / totalActivities) * 100) : 0;
        
        // Calculate total participants across all active activities
        const totalParticipants = [
          ...childrenClassesData.filter(c => c.status === 'active' || !c.status),
          ...juniorYouthGroupsData.filter(g => g.status === 'active' || !g.status),
          ...studyCirclesData.filter(s => s.status === 'active' || !s.status)
        ].reduce((sum, activity) => sum + (activity.totalParticipants || 0), 0);

        // Update stats
        setStats({
          totalIndividuals,
          totalActivities,
          childrenClasses: childrenClassesData.length,
          juniorYouthGroups: juniorYouthGroupsData.length,
          studyCircles: studyCirclesData.length,
          localities: localitiesData.length,
          latestCycleParticipants: totalParticipants,
          completionRate
        });

        // Prepare recent activities
        const allActivities = [
          ...childrenClassesData.map(c => ({ 
            ...c, 
            type: 'Children\'s Class', 
            color: 'bg-blue-100 text-blue-800' 
          })),
          ...juniorYouthGroupsData.map(g => ({ 
            ...g, 
            type: 'Junior Youth Group', 
            color: 'bg-green-100 text-green-800' 
          })),
          ...studyCirclesData.map(s => ({ 
            ...s, 
            type: 'Study Circle', 
            color: 'bg-purple-100 text-purple-800' 
          }))
        ]
        .sort((a, b) => new Date(b.startDate || b.timestamp || b.createdAt) - new Date(a.startDate || a.timestamp || a.createdAt))
        .slice(0, 5);

        setRecentActivities(allActivities);

      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
    
    // Set up storage event listener for real-time updates
    const handleStorageChange = () => {
      loadDashboardData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const statCards = [
    {
      title: 'Total Individuals',
      value: stats.totalIndividuals,
      icon: <Users className="h-6 w-6" />,
      color: 'bg-blue-500',
      description: 'Registered community members'
    },
    {
      title: 'Total Activities',
      value: stats.totalActivities,
      icon: <Activity className="h-6 w-6" />,
      color: 'bg-green-500',
      description: 'Ongoing core activities'
    },
    {
      title: 'Localities',
      value: stats.localities,
      icon: <MapPin className="h-6 w-6" />,
      color: 'bg-purple-500',
      description: 'Active communities'
    },
    {
      title: 'Activity Completion',
      value: `${stats.completionRate}%`,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-orange-500',
      description: 'Completed activities rate'
    },
    {
      title: 'Children\'s Classes',
      value: stats.childrenClasses,
      icon: <BookOpen className="h-6 w-6" />,
      color: 'bg-teal-500',
      description: 'Active classes'
    },
    {
      title: 'Junior Youth Groups',
      value: stats.juniorYouthGroups,
      icon: <Users2 className="h-6 w-6" />,
      color: 'bg-pink-500',
      description: 'Active groups'
    },
    {
      title: 'Study Circles',
      value: stats.studyCircles,
      icon: <GraduationCap className="h-6 w-6" />,
      color: 'bg-indigo-500',
      description: 'Active study circles'
    },
    {
      title: 'Current Participants',
      value: stats.latestCycleParticipants,
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'bg-red-500',
      description: 'Active participants across all activities'
    }
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">SRP 3.1 Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Statistical overview of community growth and activities
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, index) => (
          <StatsCard key={index} {...card} />
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
          <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</span>
        </div>
        
        {recentActivities.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Locality
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participants
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Started
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentActivities.map((activity, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {activity.name || activity.locality || 'Unnamed Activity'}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${activity.color}`}>
                        {activity.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {activity.locality || 'Not specified'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {activity.totalParticipants || 0}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        activity.status === 'active' || !activity.status
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {activity.status === 'active' || !activity.status ? 'Active' : 'Completed'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {activity.startDate 
                        ? new Date(activity.startDate).toLocaleDateString()
                        : 'Not set'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No activities recorded yet. Start by adding your first activity!</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            className="flex flex-col items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            onClick={() => window.location.href = '#/forms/individuals'}
          >
            <Users className="h-8 w-8 text-blue-600 mb-2" />
            <span className="font-medium text-gray-900">Add Individual</span>
            <span className="text-sm text-gray-500 mt-1">Register new community member</span>
          </button>
          
          <button 
            className="flex flex-col items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            onClick={() => window.location.href = '#/forms/children-classes'}
          >
            <BookOpen className="h-8 w-8 text-green-600 mb-2" />
            <span className="font-medium text-gray-900">Start Children's Class</span>
            <span className="text-sm text-gray-500 mt-1">Create new class record</span>
          </button>
          
          <button 
            className="flex flex-col items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            onClick={() => window.location.href = '#/forms/locality'}
          >
            <MapPin className="h-8 w-8 text-purple-600 mb-2" />
            <span className="font-medium text-gray-900">Add Locality</span>
            <span className="text-sm text-gray-500 mt-1">Register new community</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
