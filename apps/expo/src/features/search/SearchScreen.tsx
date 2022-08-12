import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

import Spacer from '../../common/components/Spacer';
import { TitleCard } from '@features/home/components';

import useMoviesSearch from 'app/features/search/hooks/useSearch';
import { fontSize } from '@constants/typography';

interface SearchScreenProps {}

const SearchScreen: React.FunctionComponent<SearchScreenProps> = () => {
  const { data, searchQuery, setSearchQuery } = useMoviesSearch();

  console.log("DATA", JSON.stringify(data, null, 2))


  return (
    <View>
      <Text style={styles.title}>Search screen</Text>
      <TextInput onChangeText={(val) => setSearchQuery(val)} value={searchQuery} style={{borderWidth: 1, borderColor: "black", borderRadius: 3, height: 40, marginHorizontal: 10, paddingHorizontal: 10}} />
      <Spacer height={10} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        // @ts-ignore
        renderItem={({ item }) => <TitleCard title={{ ...item, media_type: "movie" }} />}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Spacer height={10} />}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    marginBottom: 10
  }
})

export default SearchScreen;
