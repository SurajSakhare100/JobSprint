// src/components/Categories.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
}
const sampleCategories = [
  { id: 1, name: "Software Development" },
  { id: 2, name: "Product Management" },
];
const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch categories from the backend API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories(sampleCategories)
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <Text>Loading categories...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title} className='text-white'>Job Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        className='flex-1 flex-row'
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
    borderRadius: 8,
  },
  categoryName: {
    fontSize: 18,
  },
});

export default Categories;
