import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { usePhone } from 'app/components/ui/shared/phone.context';
import { useCarousel } from 'app/utils/useCarousel';
import BalanceCard from 'app/components/ui/shared/BalanceCard';
import EventsCarousel from 'app/components/ui/shared/EventsCarousel';
// import Svg icons and images as needed
// import QRCodeSvg from 'assets/svg/qr-code.svg';
// import PayIcon from 'assets/svg/pay.svg';
// import DepositIcon from 'assets/svg/deposit.svg';
// import TransferIcon from 'assets/svg/transfer.svg';
// import ReceiveIcon from 'assets/svg/receive.svg';
// import ParticipativeIcon from 'assets/svg/participative.svg';
// import CommunityIcon from 'assets/svg/community.svg';
// import CascadeIcon from 'assets/svg/cascade.svg';
// import FundRequestIcon from 'assets/svg/fund-request.svg';

const eventImages = [
  require('assets/images/pub_1.jpeg'),
  require('assets/images/pub_2.jpeg'),
  require('assets/images/pub_3.jpeg'),
];

export const HomeScreen = () => {
  const { phone } = usePhone();
  const userBalance = '----'; // Hidden by default
  const [eventIndex] = useCarousel(eventImages.length, 3000);

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-6" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="relative flex-row items-center justify-between mb-4 h-16 mt-10">
        {/* Left avatar */}
        <View className="absolute left-0 w-12 h-12  bg-gray-300 rounded-full" />
        {/* Centered text */}
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-black-500 font-bold">Welcome,</Text>
          <Text className="text-3xl font-heavy text-black">{phone}</Text>
        </View>
        {/* Right placeholder */}
        <View className="absolute right-0 w-8 h-8" />
      </View>

      {/* QR & Balance */}
      <BalanceCard />

      {/* Events */}
      <EventsCarousel />

      {/* Payment & Transfer */}
      <View className="mb-8">
        <Text className="text-base font-bold mb-2">Payment & transfer</Text>
        <View className="flex-row justify-between mb-2">
          <View className="items-center flex-1">
            {/* <PayIcon width={40} height={40} /> */}
            <View className="w-12 h-12 bg-black rounded-full mb-1" />
            <Text className="font-bold">Payment</Text>
          </View>
          <View className="items-center flex-1">
            {/* <DepositIcon width={40} height={40} /> */}
            <View className="w-12 h-12 bg-black rounded-full mb-1" />
            <Text className="font-bold">Deposit</Text>
          </View>
          <View className="items-center flex-1">
            {/* <TransferIcon width={40} height={40} /> */}
            <View className="w-12 h-12 bg-black rounded-full mb-1" />
            <Text className="font-bold">Transfer</Text>
          </View>
          <View className="items-center flex-1">
            {/* <ReceiveIcon width={40} height={40} /> */}
            <View className="w-12 h-12 bg-black rounded-full mb-1" />
            <Text className="font-bold">Receive</Text>
          </View>
        </View>
      </View>

      {/* Services */}
      <View className="mb-8">
        <Text className="text-base font-bold mb-2">Services</Text>
        <View className="flex-row justify-between mb-2">
          <View className="items-center flex-1">
            {/* <ParticipativeIcon width={40} height={40} /> */}
            <View className="w-12 h-12 bg-gray-200 rounded-full mb-1" />
            <Text className="font-bold text-xs text-center">Participative network</Text>
          </View>
          <View className="items-center flex-1">
            {/* <CommunityIcon width={40} height={40} /> */}
            <View className="w-12 h-12 bg-gray-200 rounded-full mb-1" />
            <Text className="font-bold text-xs text-center">Community</Text>
          </View>
          <View className="items-center flex-1">
            {/* <CascadeIcon width={40} height={40} /> */}
            <View className="w-12 h-12 bg-gray-200 rounded-full mb-1" />
            <Text className="font-bold text-xs text-center">Cascade</Text>
          </View>
          <View className="items-center flex-1">
            {/* <FundRequestIcon width={40} height={40} /> */}
            <View className="w-12 h-12 bg-gray-200 rounded-full mb-1" />
            <Text className="font-bold text-xs text-center">Fund requests</Text>
          </View>
        </View>
      </View>

      {/* Transaction history */}
      <View className="mb-8">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-base font-bold">Transaction history</Text>
          <TouchableOpacity>
            <Text className="text-base font-bold underline">View all</Text>
          </TouchableOpacity>
        </View>
        {/* Example transaction */}
        <View className="flex-row items-center mb-2">
          <View className="w-10 h-10 bg-gray-300 rounded-full mr-2" />
          <View className="flex-1">
            <Text className="font-bold">From Veronique Dubois</Text>
            <Text className="text-xs text-gray-500">+225 01 02 03 04 05</Text>
          </View>
          <View className="items-end">
            <Text className="font-bold text-base">-3 450 Fcfa</Text>
            <Text className="text-xs text-gray-500">Jun-1 · 12:00 pm</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
