import * as React from 'react'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { visuallyHidden } from '@mui/utils'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import DeleteAssignmentModal from '@/mic-component/Instructor_UI/AssignmentDeleteModalForInstructor/AssignmentDeleteModalForInstructor'
import { toast } from 'react-hot-toast'
import TextField from '@mui/material/TextField'

interface Data {
  [key: string]: string | number | string[]
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

interface EnhancedTableProps {
  data: Data[]
  headCells: HeadCell[]
  title: string
  filterRow: string
  dense?: boolean
  rowsPerPageOptions?: number[]
  defaultRowsPerPage?: number
  onDelete?: (myId: string) => void
  onFilter?: () => void
  renderRowActions?: (row: Data) => React.ReactNode
}

const EnhancedTable: React.FC<EnhancedTableProps> = ({
  data,
  headCells,
  title,
  dense = false,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 5,
  onDelete,
  onFilter,
  renderRowActions,
  filterRow
}) => {
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>(headCells[0].id)
  const [selected, setSelected] = React.useState<string | null>(null)
  const [selectedName, setSelectedName] = React.useState<
    string | number | null
  >(null)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage)
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('') // État pour la recherche par nom

  const filteredData = data.filter(row =>
    row[filterRow].toString().toLowerCase().includes(searchQuery.toLowerCase())
  )

  const confirmDeleteAssignment = async () => {
    if (selected) {
      try {
        onDelete(selected)
        toast.success('Deleted successfully')
      } catch {
        toast.error('Failed to delete')
      } finally {
        setOpenDeleteDialog(false)
      }
    }
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map(n => n.id as string)
      setSelected(newSelected[0]) // Sélectionner le premier élément si 'select all' est coché
    } else {
      setSelected(null)
    }
  }

  const handleClick = (
    event: React.MouseEvent<unknown>,
    id: string,
    n: string | number
  ) => {
    if (selected === id) {
      setSelectedName(null)
      setSelected(null)
    } else {
      setSelected(id)
      setSelectedName(n)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        sx={{ width: '100%', mb: 0, margin: 0, padding: 0, borderRadius: 2 }}
      >
        <Toolbar
          className=''
          sx={[
            { pl: { sm: 2 }, pr: { xs: 1, sm: 1 } },
            selected && {
              bgcolor: theme =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                )
            }
          ]}
        >
          {selected ? (
            <Typography
              sx={{ flex: '1 1 100%' }}
              color='inherit'
              variant='subtitle1'
              component='div'
            >
              {selectedName} sélectionné
            </Typography>
          ) : (
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant='h6'
              id='tableTitle'
              component='div'
            >
              {title}
            </Typography>
          )}
          {selected ? (
            <Tooltip title='Supprimer'>
              <IconButton onClick={() => setOpenDeleteDialog(true)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title='Filtrer la liste'>
              <IconButton onClick={onFilter}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
          <TextField
            label='Rechercher par nom'
            variant='outlined'
            size='small'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            sx={{ marginLeft: 2 }}
          />
        </Toolbar>
        <TableContainer>
          <Table
            sx={{ minWidth: 750, marginInlineStart: 2 }}
            size={dense ? 'small' : 'medium'}
          >
            <TableHead sx={{ minWidth: 750, margin: 0 }}>
              <TableRow>
                {headCells.map(headCell => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => {
                        const isAsc = orderBy === headCell.id && order === 'asc'
                        setOrder(isAsc ? 'desc' : 'asc')
                        setOrderBy(headCell.id)
                      }}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <span style={visuallyHidden}>
                          {order === 'desc'
                            ? 'trié par décroissant'
                            : 'trié par croissant'}
                        </span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
                {renderRowActions && <TableCell>ACTIONS</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  const isItemSelected = selected === row.id
                  const labelId = `enhanced-table-checkbox-${row.id}`

                  return (
                    <TableRow
                      hover
                      onClick={event =>
                        handleClick(
                          event,
                          row._id as string,
                          row.NomPrenom ? row.NomPrenom.toString() : 'inconnu'
                        )
                      }
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id as string}
                      selected={isItemSelected}
                    >
                      {headCells.map(headCell => (
                        <TableCell
                          key={headCell.id}
                          align={headCell.numeric ? 'right' : 'left'}
                        >
                          {row[headCell.id]}
                        </TableCell>
                      ))}
                      {renderRowActions && (
                        <TableCell>{renderRowActions(row)}</TableCell>
                      )}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component='div'
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={event => {
            setRowsPerPage(parseInt(event.target.value, 10))
            setPage(0)
          }}
        />
      </Paper>
      {openDeleteDialog && (
        <DeleteAssignmentModal
          isOpen={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onConfirm={confirmDeleteAssignment}
        />
      )}
    </Box>
  )
}

export default EnhancedTable
