import {React,useState,useMemo,useEffect} from 'react';
import {useTable,useGlobalFilter,useFilters} from 'react-table';
import NavBar from '../components/navbar';
import { ViewIcon } from "@chakra-ui/icons";
import { Avatar } from '@chakra-ui/avatar';
import { Input } from '@chakra-ui/input';
import { Button, ButtonGroup,Box,Image } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,Select
  } from "@chakra-ui/react";
  import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
  } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
  } from "@chakra-ui/react"
import { Link } from 'react-router-dom';
export default function Viewuserlist() {
    const [userlist, setuserlist] = useState([]);
    const [Currentuser,setcurrentuser]=useState([])
    
 
    return (
        <NavBar>
                
                <div>
                    <BasicTableComponent data1={list1} column={columns}/>
           
            </div>

        </NavBar>
        
    )

}
const handle1=(e)=> console.log(e)
 
const Useritem=(item)=>{
    return(
        
    <Tr>
      <Td>{item.item.Index}</Td>
      <Td>
      <Popover>
        <PopoverTrigger>
            <Avatar src={item.item.Picture}/>
        </PopoverTrigger>
        <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>{item.item.Username}</PopoverHeader>
            <PopoverBody>
                
            <div><Image src={item.item.Picture} alt="Segun Adebayo"  style={{objectFit:"contain"}}/></div>
                
            
                </PopoverBody>
        </PopoverContent>
        </Popover>
      
      </Td>
      <Td>{item.item.Username}</Td>
      <Th>{item.item.Country}</Th>
      <Th>{item.item.Religion}</Th>
     <Td isNumeric><Button><Link to={"/admin/Viewsingleuser"}> <ViewIcon /></Link></Button></Td>
    </Tr>

  
    );

}
const list1=[{'index':1,'username':"Varatharajan",'country':"Srilanka",'religion':"Hindu",'picture':"https://bit.ly/sage-adebayo"},
    {'index':2,'username':"kamal",'country':"Srilanka",'religion':"Hindu",'picture':"https://bit.ly/dan-abramov"},
    {'index':1,'username':"Varatharajan",'country':"Srilanka",'religion':"Hindu",'picture':"https://bit.ly/sage-adebayo"},
    {'index':2,'username':"kamal",'country':"Srilanka",'religion':"Hindu",'picture':"https://bit.ly/dan-abramov"},
    {'index':1,'username':"Varatharajan",'country':"Srilanka",'religion':"Hindu",'picture':"https://bit.ly/sage-adebayo"},
    {'index':2,'username':"kamal",'country':"Srilanka",'religion':"Hindu",'picture':"https://bit.ly/dan-abramov"},
    

];
const list2=[{"index":1,"username":"Varatharajan","country":"srilanka","religion":"Hindu"},
    {"index":2,"username":"kamal","country":"Srilanka","religion":"Hindu"},
    

];
const ColumnFilter=({
    column: { filterValue, preFilteredRows, setFilter },
})=> {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}
const columns = [
   
    {Header:'Profile',
    width:200,
    accessor:'picture',
    Cell:(props)=>(<Popover >
        <PopoverTrigger>
            <Avatar src={props.value}/>
        </PopoverTrigger>
        <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader style={{backgroundColor:"grey"}}>View Profile</PopoverHeader>
            <PopoverBody style={{backgroundColor:"grey"}}>
                
            <div><Image src={props.value} alt="Segun Adebayo"  style={{objectFit:"contain"}}/></div>
                
            
                </PopoverBody>
        </PopoverContent>
        </Popover>)
},

    {Header:'Username',
    accessor:'username',
    Filter:ColumnFilter
    },
    {Header:'Country',
    accessor:'country',
    Filter:ColumnFilter

    },
    {Header:'Religion',
    accessor:'religion',
    Filter:ColumnFilter
    }

]




function BasicTableComponent({column,data1}) {
        const columns=useMemo(()=>column,[]);
        const data=useMemo(()=>data1,[])
        const defaultColumn = useMemo(
            () => ({
              // Let's set up our default Filter UI
              Filter: ColumnFilter,
            }),
            []
          )  
    
           
        
    

    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,setGlobalFilter
    } = useTable({
         columns,
         data,defaultColumn
    },useFilters,useGlobalFilter)
const {globalfilter}=state
    return (
        <>
            
            <table className="table" {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        <th>Index</th>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}
                            <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>
                            
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    const Id=i
                    const handle=()=>(handle1(Id))
                    return (
                        <tr {...row.getRowProps()}>
                            <td>{i}</td>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                            <td><Button onClick={handle}><Link to={"/admin/Viewsingleuser"}>Show</Link></Button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}

const GlobalFilter=({filter,setfilter})=>{
    return(
        <span>
            Search:{''}
            <input  value={filter || ' '}
                onChange={e =>setfilter(e.target.value) } />
        </span>
    )
}

