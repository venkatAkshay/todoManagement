'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList(){
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      const overDueItems = await Todo.overdue();
      overDueItems.forEach((todoItem) => {
        console.log(todoItem.displayableString())
      });
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const dueTodayItem = await Todo.dueToday();
      dueTodayItem.forEach((todoItem) =>{
        console.log(todoItem.displayableString())
      });
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const dueLaterItem = await Todo.dueLater();
      dueLaterItem.forEach((todoItem) => {
        console.log(todoItem.displayableString())
      });
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      const overDueItems = await Todo.findAll({
        where:{dueDate:{[Op.lt]: new Date()}},
        order: [["id", "ASC"]],
      });
      return overDueItems;
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const dueTodayItems = await Todo.findAll({
        where:{dueDate: new Date()},
        order:[["id", "ASC"]],
      });
      return dueTodayItems;
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const dueLaterItems = await Todo.findAll({
        where:{dueDate: {[Op.gt]: new Date()}},
        order:[["id", "ASC"]],
      });
      return dueLaterItems;
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      await Todo.update(
        {completed:true},
        {
          where:{
            id:id,
          },
        }
      );

    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let displayDate = 
        this.dueDate === new Date().toLocaleDateString("en-CA")
        ? ""
        : this.dueDate;
        return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
    }
  
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
