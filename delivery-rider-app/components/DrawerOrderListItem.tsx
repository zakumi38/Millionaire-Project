import { useState } from "react"
import { NextPage } from "next"

// Files
import {
    Collapse,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material"
import ExpandLess from "@mui/icons-material/Expandless"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

interface Orders {
    id: number
    shopName: string
    shopAddress: string
    items: [
        {
            name: string
            quantity: number
        }
    ]
}

interface Props {
    item: Orders
}

const OrderListItem: NextPage<Props> = ({ item }) => {
    // Edge drawer's content
    const [content, setContent] = useState(false)

    const handleClick = () => {
        setContent(!content)
    }
    return (
        <List disablePadding>
            <ListItemButton onClick={handleClick} sx={{ width: "100%" }}>
                <ListItemText primary={item.shopName} />
                {content ? <ExpandLess /> : <ExpandMoreIcon />}
            </ListItemButton>
            <Collapse in={content} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton
                        disableGutters
                        sx={{ px: 4, pt: 0, fontSize: 18, fontWeight: 400 }}
                    >
                        {item.shopAddress}
                    </ListItemButton>
                </List>
            </Collapse>
            {item.items.map((food, index) => (
                <ListItem
                    disablePadding
                    disableGutters
                    sx={{ pl: 2 }}
                    key={index}
                >
                    <Grid
                        container
                        justifyContent="space-between"
                        fontWeight={300}
                        fontSize={16}
                    >
                        <div>{food.name}</div>
                        <div style={{ marginRight: "16px" }}>
                            x{food.quantity}
                        </div>
                    </Grid>
                </ListItem>
            ))}
        </List>
    )
}
export default OrderListItem
