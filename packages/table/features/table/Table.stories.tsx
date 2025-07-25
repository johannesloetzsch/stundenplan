import { type Meta } from '@storybook/react-vite'
import { Decorator, FilteredRows, data } from './TableExample'
import { Table } from './Table'

export default {
  title: 'table/Table',
  component: Table,
  decorators: [
    (Story: typeof Table) => (
      <Decorator>
        <Story data={data} />
        <FilteredRows />
      </Decorator>
    ),
  ],
  //tags: ['autodocs'],
  parameters: {
    docs: {
      codePanel: true,
    },
  },
} satisfies Meta<typeof Table>

export const Default = {
  args: {
    data,
  },
}
