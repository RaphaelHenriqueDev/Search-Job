import { DataTypes } from 'sequelize'
import conn from '../config/conn.js'

const Job = conn.define('Jobs', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  stack: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  source: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
})

export default Job
