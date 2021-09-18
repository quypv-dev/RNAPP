
import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    ScrollView,
    Dimensions
} from "react-native";
import { Container, Header, Icon, Item, Input, Text } from "native-base";

import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProducts";
import Banner from "../../Shared/Banner";


var { height } = Dimensions.get('window')


const data = require('../../assets/data/products.json')
const categories = require('../../assets/data/categories.json')

const ProductContainer = () => {

    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);


    useEffect(() => {
        setProducts(data);
        setProductsFiltered(data);
        setFocus(false);
        setCategories(categories);
        setActive(-1);
        setInitialState(data);


        return () => {
            setProducts([])
            setProductsFiltered([])
            setFocus([])
            setCategories([])
            setActive([])
            setInitialState([])




        }
    }, [])

    // Product Methods
    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        );
    };

    const openList = () => {
        setFocus(true);
    };

    const onBlur = () => {
        setFocus(false);
    };

    return (
        <Container>
            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input
                        placeholder="Search"
                        onfocus={openList}
                        onChangeText={(text) => searchProduct(text)}

                    />
                    {focus == true ? (
                        <Icon onPress={onBlur} name="ios-close"/>
                    ) : null}
                </Item>
            </Header>
            {focus == true ? (
                <SearchedProduct
                    productsFiltered={productsFiltered}
                />
            ) : (
                <View style={styles.container}>
                    <View>
                        <Banner/>
                    </View>
                    <View style={styles.listContainer}>
                        <FlatList
                            numColumns={2}
                            data={products}
                            renderItem={({ item }) => <ProductList
                                key={item.brand}
                                item={item}
                            />}
                            keyExtractor={item => item.brand}
                        />
                    </View>
                </View>
            )}

        </Container >


    )

}
const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    listContainer: {
        height: height,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default ProductContainer;