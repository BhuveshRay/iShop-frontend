import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WebsiteMain from "./pages/website/Main";
import AdminMain from "./pages/admin/Main";
import Home from "./pages/website/Home"
import Dashboard from "./pages/admin/Dashboard";
import Store from "./pages/website/Store";
import CategoryAdd from "./pages/admin/category/Add";
import CategoryView from "./pages/admin/category/View";
import CategoryEdit from "./pages/admin/category/Edit";
import ProductAdd from "./pages/admin/product/Add";
import ProductView from "./pages/admin/product/View";
import ProductEdit from "./pages/admin/product/Edit";
import ColorAdd from "./pages/admin/color/Add";
import ColorView from "./pages/admin/color/View";
import Cart from "./pages/website/Cart";
import Checkout from "./pages/website/Checkout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { lsToCart } from "./reducers/CartSlice";
import { lsToUser } from "./reducers/UserSlice";
import Login from "./pages/website/Login";
import AdminLogin from "./pages/admin/AdminLogin";
import Signup  from "./pages/website/Signup";
import Thankyou from "./pages/website/Thankyou";
import User from "./pages/admin/user/User";
import OrderView from "./pages/admin/OrderView"
import TransactionView from "./pages/admin/TransactionView";
import Iphone from "./pages/website/Iphone";
import Profile from "./pages/website/userProfile/Profile";
import EditProfile from "./pages/website/userProfile/EditProfile";
import Ipad from "./pages/website/Ipad";
import Macbook from "./pages/website/Macbook";
import AdminView from "./pages/admin/AdminView";
import Accesories from "./pages/website/Accesories";
import UserEdit from "./pages/admin/user/UserEdit";
import AdminSingup from "./pages/admin/AdminSigup";

function App() {
  const cartData = useSelector(store => store.cart);
  const dispatcher = useDispatch();

  useEffect(
    () => {
      dispatcher(lsToCart());
      dispatcher(lsToUser());
    }, []
  )

  useEffect(
    () => {
      localStorage.setItem("cartData", JSON.stringify(cartData));
    }, [cartData]
  )

  const routes = createBrowserRouter(
    [
      {
        path: "/",
        element: <WebsiteMain />,
        children: [
          {
            path: "",
            element: <Home />
          },
          {
            path: "store/:category_slug?",
            element: <Store />
          },
          {
            path:"iphone",
            element:<Iphone/>
          },
          {
            path:"ipad",
            element:<Ipad/>
          },
          {
            path:"macbook",
            element:<Macbook/>
          },
          {
            path: "accesories",
            element: <Accesories/>
          },
          {
            path: "cart",
            element: <Cart />
          },
          {
            path: "checkout",
            element: <Checkout />
          }
        ]
      },
      {
        path:"profile",
        element:<Profile/>
      },
      {
        path:"edit-profile",
        element:<EditProfile/>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "order-place-thank-you/:order_id",
        element: <Thankyou />
      },
      {
        path: "/admin",
        element: <AdminMain />,
        children: [
          {
            path: "",
            element: <Dashboard />
          },
          {
            path: "category",
            children: [
              {
                path: "add",
                element: <CategoryAdd />
              },
              {
                path: "view",
                element: <CategoryView />
              },
              {
                path: "edit/:cid",
                element: <CategoryEdit />
              }
            ]
          },
          {
            path: "color",
            children: [
              {
                path: "add",
                element: <ColorAdd />
              },
              {
                path: "view",
                element: <ColorView />
              }
            ]
          },
          {
            path: "product",
            children: [
              {
                path: "add",
                element: <ProductAdd />
              },
              {
                path: "view",
                element: <ProductView />
              },
              {
                path: "edit/:id",
                element: <ProductEdit />
              }
            ]
          },
          {
            path: "user",
            children: [
              {
                path:"",
                element:<User/>
              },
              {
                path:"user-edit",
                element:<UserEdit/>
              }
            ]
          }
         ,
          {
            path:"order",
            element:<OrderView/>
          },
          {
            path:"transactions",
            element:<TransactionView/>
          },
          {
            path: "view",
                element: <AdminView/>
          }
        ]
      },
      {
        path: "/admin/admin-login",
        element: <AdminLogin />
      },
      {
        path: "/admin-signup",
        element: <AdminSingup />
      }
    ]
  )
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
