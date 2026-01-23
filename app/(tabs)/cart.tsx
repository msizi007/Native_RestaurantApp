// import { RootState } from "@/store";
// import { Colors } from "@/types/Colors";
// import { Ionicons } from "@expo/vector-icons";
// import React from "react";
// import {
//   Dimensions,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useSelector } from "react-redux";

// const { width } = Dimensions.get("window");

// const Cart = () => {
//   // Mock data for skeleton items
//   const cartItems = useSelector((state: RootState) => state.cart.items);

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>My Cart</Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {cartItems.map((item, i) => (
//           <View key={i} style={styles.cartCard}>
//             {/* Image Placeholder */}
//             <View style={styles.itemImage}>
//               <Image
//                 source={{ uri: item.imageUrl }}
//                 resizeMode="center"
//                 width={100}
//               />
//             </View>

//             {/* Item Info Placeholder */}
//             <View style={styles.itemInfo}>
//               <Text style={[{ fontWeight: "bold", fontSize: 16 }]}>
//                 {item.name}
//               </Text>
//               <View style={styles.priceRow}>
//                 <Text style={styles.price}>
//                   {`R ${parseFloat(item.price) * item.quantity}`}
//                 </Text>

//                 {/* Quantity Selector Placeholder */}
//                 <View style={styles.quantityContainer}>
//                   <Ionicons
//                     name="remove"
//                     size={25}
//                     color={Colors.white}
//                     style={styles.button}
//                   />
//                   <Text style={styles.quantity}>{item.quantity}</Text>
//                   <Ionicons
//                     name="add"
//                     size={25}
//                     color={Colors.white}
//                     style={styles.button}
//                   />
//                 </View>
//               </View>
//             </View>
//           </View>
//         ))}
//       </ScrollView>

//       {/* Bottom Summary Section */}
//       <View style={styles.footer}>
//         <View style={styles.totalRow}>
//           <Text style={styles.totalLabel}>Total</Text>
//           <View
//             style={[
//               styles.textBar,
//               { width: 80, height: 20, backgroundColor: "#FF914D" },
//             ]}
//           />
//         </View>

//         <TouchableOpacity style={styles.checkoutBtn}>
//           <Text style={styles.checkoutText}>Proceed to Checkout</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F8F8F8",
//   },
//   button: {
//     backgroundColor: Colors.primary,
//     padding: 5,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   quantity: {
//     fontSize: 22,
//     fontWeight: "bold",
//     padding: 10,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     color: "gray",
//   },
//   price: {
//     fontSize: 18,
//     fontWeight: "bold",
//     borderRadius: 10,
//     alignItems: "center",
//     color: "gray",
//   },
//   header: {
//     paddingTop: 60,
//     paddingBottom: 20,
//     paddingHorizontal: 20,
//     backgroundColor: "#FFF",
//     alignItems: "center",
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   scrollContent: {
//     padding: 15,
//   },
//   cartCard: {
//     flexDirection: "row",
//     backgroundColor: "#FFF",
//     borderRadius: 15,
//     padding: 12,
//     marginBottom: 15,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   itemImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//   },
//   itemInfo: {
//     flex: 1,
//     marginLeft: 15,
//     justifyContent: "center",
//   },
//   textBar: {
//     backgroundColor: "#F0F0F0",
//     borderRadius: 4,
//   },
//   priceRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 12,
//   },
//   quantityContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   qtyBtn: {
//     width: 24,
//     height: 24,
//     borderRadius: 6,
//     backgroundColor: "#F0F0F0",
//   },
//   footer: {
//     backgroundColor: "#FFF",
//     padding: 20,
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     elevation: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//   },
//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   totalLabel: {
//     fontSize: 18,
//     color: "#888",
//   },
//   checkoutBtn: {
//     backgroundColor: "#FF914D",
//     height: 55,
//     borderRadius: 15,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   checkoutText: {
//     color: "#FFF",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default Cart;
