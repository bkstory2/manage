import './App.css';
import Customer from './components/Customer';

const customers=[
    {
    'id' : '1',
    'image' : '/upload/bbb.jpg' , 
    'name' : 'cc2',
    'birthday' : '730202',
    'gender' : 'M',
    'job' : 'dev',
    },
    {
    'id' : '2',
    'image' : '/upload/bbb.jpg' , 
    'name' : 'cc222',
    'birthday' : '730202',
    'gender' : 'M',
    'job' : 'dev',
    },
    {
      'id' : '3',
      'image' : '/upload/bbb.jpg' , 
      'name' : 'cc3332',
      'birthday' : '730303',
      'gender' : 'M',
      'job' : 'dev',
   }
]

function App() {
  return (
    <div className="App">
        {
           customers.map( c=>{
             return( <Customer
                  key={c.id} 
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birthday={c.birthday}
                  gender={c.gender}
                  job={c.job}
              />
             ) 
           })
        }     
   
    </div>
  );
}

export default App;
