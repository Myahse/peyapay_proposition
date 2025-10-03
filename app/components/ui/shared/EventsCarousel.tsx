// EventsCarousel Component
// This component displays a horizontal scrollable carousel of event images.
// It uses a custom hook for automatic scrolling and displays dots to indicate the current image.

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useCarousel } from 'app/utils/useCarousel';
import EventCard from './EventCard';

// Array of event images to be displayed in the carousel
const eventImages = [
  require('assets/images/pub_1.jpeg'),
  require('assets/images/pub_2.jpeg'),
  require('assets/images/pub_3.jpeg'),
];

// Add a fourth element for the EventCard
const eventElements = [
  ...eventImages,
  { type: 'card', title: 'Event Title', subtitle: 'Event Subtitle' }
];

const EventsCarousel: React.FC = () => {
  // Custom hook to manage the current index of the displayed image
  const [eventIndex, setEventIndex] = useCarousel(eventElements.length, 3000);
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Effect to scroll to the current image index
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: eventIndex * 320, animated: true });
    }
  }, [eventIndex]);

  // Handle scroll event to update the current index
  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / 320);
    setCurrentIndex(index);
  };

  return (
    <View className="mb-4">
      <Text className="text-base font-heavy mb-2">Events</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={320}
        snapToAlignment="center"
      >
        {/* Duplicate the last element at the beginning */}
        {eventElements[eventElements.length - 1].type === 'card' ? (
          <EventCard title={eventElements[eventElements.length - 1].title} subtitle={eventElements[eventElements.length - 1].subtitle} />
        ) : (
          <Image
            source={eventElements[eventElements.length - 1]}
            className="w-80 h-48 rounded-xl mb-2 mr-2"
            resizeMode="cover"
          />
        )}
        {eventElements.map((element, index) => (
          <View key={index}>
            {element.type === 'card' ? (
              <EventCard title={element.title} subtitle={element.subtitle} />
            ) : (
              <Image
                source={element}
                className="w-80 h-48 rounded-xl mb-2 mr-2"
                resizeMode="cover"
              />
            )}
          </View>
        ))}
        {/* Duplicate the first element at the end */}
        {eventElements[0].type === 'card' ? (
          <EventCard title={eventElements[0].title} subtitle={eventElements[0].subtitle} />
        ) : (
          <Image
            source={eventElements[0]}
            className="w-80 h-48 rounded-xl mb-2 mr-2"
            resizeMode="cover"
          />
        )}
      </ScrollView>
      {/* Dots for carousel */}
      <View className="flex-row justify-center items-center">
        {eventElements.map((_, i) => (
          <View
            key={i}
            className={`w-2 h-2 rounded-full mx-1 ${i === currentIndex ? 'bg-gray-400' : 'bg-gray-200'}`}
          />
        ))}
      </View>
    </View>
  );
};

export default EventsCarousel; 