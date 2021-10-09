import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import { Scrollbar } from "react-scrollbars-custom";

const tab_items = ["Булки", "Соусы", "Начинки"];

class BurgerIngredients extends React.Component {
  state = {
    currentTab: "Булки",
  };

  changeTab(value) {
    this.setState({
      ...this.state,
      currentTab: value,
    });
  }
  render() {
    return (
        <section className={styles.section_container}>
          <p className="text text_type_main-large mt-10">Соберите бургер</p>

          <div className={`${styles.tab_block} mt-5`}>
            {tab_items.map((item, index) => (
              <Tab
                key={index}
                value={item}
                active={this.state.currentTab === tab_items[index]}
                onClick={() => this.changeTab(tab_items[index])}
              >
                {item}
              </Tab>
            ))}
          </div>
          
          <Scrollbar style={{ height: 700 }}>
            
              <p className={`${styles.ingredient_type} text text_type_main-small mt-10 mb-6`}>Булки</p>
              <ul className={`${styles.ingredients_block} pl-4 pr-4`}>
                {this.props.ingredients.map((item, index) => {
                  if (item.type === "bun") {
                    return (
                      <IngredientItem key={index} ingredient={item}  />
                    )
                  }
                })}
              </ul>

              <p className={`${styles.ingredient_type} text text_type_main-small mt-10 mb-6`}>Соусы</p>
              <ul className={`${styles.ingredients_block} pl-4 pr-4`}>
                {this.props.ingredients.map((item, index) => {
                  if (item.type === "sauce") {
                    return (
                      <IngredientItem key={index} ingredient={item}  />
                    )
                  }
                })}
              </ul>

              <p className={`${styles.ingredient_type} text text_type_main-small mt-10 mb-6`}>Начинки</p>
              <ul className={`${styles.ingredients_block} pl-4 pr-4`}>
                {this.props.ingredients.map((item, index) => {
                  if (item.type === "main") {
                    return (
                      <IngredientItem key={index} ingredient={item}  />
                    )
                  }
                })}
              </ul>
            
          </Scrollbar>
        </section> 

        
      
    );
  }
}

export default BurgerIngredients;
