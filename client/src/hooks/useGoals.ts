import { useState, useEffect } from 'react';
import axios from 'axios';
import { Goal } from '../types/types';
import { calculateDeadline } from '../utils/dateUtils';

const API_BASE_URL = 'https://goalserver-fgae.onrender.com';

export const useGoals = () => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      fetchGoals();
    }, []);
  
    const fetchGoals = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/goals`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoals(response.data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    const addGoal = async (description: string, timeFrame: string) => {
      try {
        const token = localStorage.getItem('token');
        const deadline = calculateDeadline(timeFrame);
        const response = await axios.post(
          `${API_BASE_URL}/goals`,
          { description, deadline },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setGoals((prev) => [...prev, response.data]);
        return true;
      } catch (error) {
        console.error('Error adding goal:', error);
        return false;
      }
    };
  
    const deleteGoal = async (id: number) => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/goals/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoals((prev) => prev.filter((goal) => goal.id !== id));
        return true;
      } catch (error) {
        console.error('Error deleting goal:', error);
        return false;
      }
    };
  
    const toggleGoalCompletion = async (goal: Goal) => {
      try {
        const token = localStorage.getItem('token');
        await axios.patch(
          `${API_BASE_URL}/goals/${goal.id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setGoals((prev) =>
          prev.map((g) =>
            g.id === goal.id ? { ...g, completed: !g.completed } : g
          )
        );
        return true;
      } catch (error) {
        console.error('Error updating goal:', error);
        await fetchGoals();
        return false;
      }
    };
  
    const editGoal = async (updatedGoal: Goal) => {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`${API_BASE_URL}/goals/${updatedGoal.id}`, updatedGoal, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoals((prev) =>
          prev.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal))
        );
        return true;
      } catch (error) {
        console.error('Error updating goal:', error);
        return false;
      }
    };
  
    return { goals, addGoal, deleteGoal, toggleGoalCompletion, editGoal, isLoading };
  };
  