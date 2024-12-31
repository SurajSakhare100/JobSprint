// src/components/FeaturedJobs.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { Image } from 'react-native-svg';
// Sample fallback data in case of API failure
const sampleJobs: Job[] = [
  {
    id: 1,
    title: "Sample Job 1",
    company: "Sample Company 1",
    location: "Remote",
    salary: "$50,000 - $70,000",
    featured: true,
    category: { name: "Software Development" },
  },
  {
    id: 2,
    title: "Sample Job 2",
    company: "Sample Company 2",
    location: "San Francisco",
    salary: "$70,000 - $90,000",
    featured: true,
    category: { name: "Product Management" },
  },
];
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  featured: boolean;
  category: {
    name: string;
  };
}

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch featured jobs from the backend API
    const fetchFeaturedJobs = async () => {
      try {
        const response = await axios.get('https://localhost:3000/api/jobs/featured');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching featured jobs:', error);
        setJobs(sampleJobs)
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedJobs();
  }, []);

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container} className='text-white '>
      <Text style={styles.title} className='text-wrap text-white'>Featured Jobs</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.jobItem} className='bg-purple-400 p-4'>
            <Image
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
              className='w-12 h-12'
            />
            <Text style={styles.jobTitle} className="text-white">{item.title}</Text>
            <Text>{item.company} - {item.location}</Text>
            <Text>{item.salary}</Text>
            <Text>Category: {item.category.name}</Text>
            <Button
              title="Apply"
              accessibilityLabel="Apply"
              style={styles.btn}
            />
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
    color: "white"
  },
  btn:{
    backgroundColor:"white",
    color:"black"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  jobItem: {
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FeaturedJobs;
