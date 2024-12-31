import { View, Text } from 'react-native';
import './../global.css'
import FeaturedJobs from './components/FeaturedJobCard';
import Categories from './components/CategoryFilter';
export default function App() {
  return (
    <View className="flex-1 justify-center items-center bg-black text-white">
     
      <FeaturedJobs/>
      <Categories/>
    </View>
  );
}