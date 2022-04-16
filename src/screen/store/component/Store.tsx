/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {
  black,
  grey100,
  grey200,
  grey600,
  primary,
  white,
} from '../../../common/colors';
import img from '../../../../assets/images/index';
import { Touchable, TextView } from '../../../common/components';
import Product from './Product';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Store: React.FC<any> = ({
  navigation,
  dataCategories,
  dataProducts,
}: any) => {
  const [products, setProducts] = useState(dataProducts);
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState<any>(false);
  const [category, setCategory] = useState<any>({});

  const filtered = dataProducts.filter(
    (p: { categoryId: any }) => p.categoryId === category._id,
  );

  const searched = dataProducts.filter((p: { name: string }) =>
    p.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const placeholder = img.findIndex(el => el.name === 'placeholder');
  const arr = filter ? filtered : searched;

  const searchInput = () => {
    return (
      <View style={styles.search}>
        <Ionicons name="search" size={20} color={grey600} />
        <TextInput
          value={searchValue}
          onChangeText={v => {
            setSearchValue(v);
            setFilter(false);
            setProducts(searched);
          }}
          placeholder={'Хайх'}
          placeholderTextColor={grey600}
          style={styles.input}
          returnKeyType="done"
        />
      </View>
    );
  };

  const renderItem = (cat: any, i: any) => {
    return (
      <Touchable
        onPress={() => {
          if (i === 0) {
            setFilter(false);
          } else {
            setCategory(cat);
            setFilter(true);
          }
        }}>
        <View
          key={'cat' + i}
          style={{
            padding: 10,
            margin: 2,
            borderColor:
              (filter && cat.name === category.name) ||
              (filter === false && i === 0)
                ? primary
                : grey100,
            borderWidth: 1,
            borderRadius: 10,
          }}>
          <TextView
            color={
              (filter && cat.name === category.name) ||
              (filter === false && i === 0)
                ? primary
                : 'black'
            }>
            {cat.name}
          </TextView>
        </View>
      </Touchable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ margin: 10 }}>
        {searchInput()}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalFlatlist}
          scrollIndicatorInsets={{ right: 1 }}
          data={[{ name: 'Бүгд' }, ...dataCategories] || []}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <ScrollView>
        <View style={styles.productContainer}>
          {arr.map((p: any) => {
            const idx = img.findIndex(el => el.name === p?.image);
            return (
              <View key={p._id}>
                <Product
                  data={p}
                  id={p?._id}
                  navigation={navigation}
                  name={p?.name}
                  unitPrice={p?.unitPrice}
                  cal={p?.cal}
                  source={idx > -1 ? img[idx].source : img[placeholder].source}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Store;

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: white },
  productContainer: {
    overflow: 'hidden',
    padding: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  search: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: grey200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  input: {
    marginLeft: 10,
    color: black,
    width: '100%',
  },
  horizontalFlatlist: {},
});
