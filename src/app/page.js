"use client"
import Header from "../components/Header/app";
import Footer from "@/components/Footer/app";
import React,{memo, useMemo} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trigger } from "@radix-ui/react-dialog";

export default function Home() {
  const [rows,setRows]=useState([]);
  const [rate,setRate]=useState('1');
  const [tax,setTax]=useState('0');
  const [flag,setFlag]=useState(false);
  const router=useRouter();
  const [open,setOpen]=useState(false);

  const [formData,setFormData]=useState({
    natureOfEmployee:'',
    fiscalYear:'',
    monthlySalary:0,
    numberOfMonths:0,
    bonus:0,
    totalSalary:0,
    socialSecurityFund:0,
    employeeProvidentFund:0,
    citizenInvestmentTrust:0,
    insurance:0
  })
  function resetData(event){
    event.preventDefault();
    setFormData({
      natureOfEmployee:'',
      fiscalYear:'',
      monthlySalary:0,
      numberOfMonths:0,
      bonus:0,
      totalSalary:0,
      socialSecurityFund:0,
      employeeProvidentFund:0,
      citizenInvestmentTrust:0,
      insurance:0
    })
    setRows([]);
      monthlySalary.value=null;
      numberOfMonths.value=null;
      bonus.value=null;
      totalSalary.value=null;
      socialSecurityFund.value=null;
      employeeProvidentFund.value=null;
      citizenInvestmentTrust.value=null;
      insurance.value=null;
    console.log("reseting");
  }
  function setData(event){
  
    const {name,value}=event.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]:value
    }))

  }
  const [finalData,setFinalData]=useState({
    TI:0,
    SSF:0,
    INS:0,
    TD:0,
    NA:0,
    AI:0,
    TL:0,
    NTLm:0,
    NTLy:0
  })
  function finalCalculation(){
    const ti=formData.totalSalary;
    const ssf=parseInt(formData.citizenInvestmentTrust)+parseInt (formData.employeeProvidentFund)+parseInt(formData.socialSecurityFund);
    const ins=formData.insurance;
    const td=parseInt(ssf)+parseInt(formData.insurance);
    const na=parseInt(ti)-parseInt(td);
    const ai=na;
    // const tl=0;
    // const ntlm=0;
    // const ntly=0;
    setFinalData((prev)=>({
      ...prev,
    TI:ti,
    SSF:ssf,
    INS:ins,
    TD:td,
    NA:na,
    AI:ai,
    // TL:tl,
    // NTLm:ntlm,
    // NTLy:ntly
    }))
    // setTimeout(()=>{taxCalc()});
  }
  function calculateData(event){
    event.preventDefault();
    if(!formData.totalSalary){
      alert("Total salary must not be empty");
    }
    else{

        finalCalculation();
        setTimeout(()=>{taxCalc()},100);
        setOpen(true);
    }

  }
  // console.log(formData);
  
  function totalSalaryCalculation(){
    const monthlySalary=parseInt(formData.monthlySalary);
    const noOfMonths=parseInt(formData.numberOfMonths);
    const bonus=parseInt(formData.bonus);
    const total=parseInt(monthlySalary*noOfMonths+bonus);
        setFormData((prevData)=>({
        ...prevData,
        totalSalary:total
      }))
      totalSalary.value=total;

  }

var inter=parseInt(0);
var ai=parseInt(finalData.AI);
  function taxCalc(){
      var tax1=parseInt(0);
    if(ai>500000){
      inter=ai-500000;
      tax1+=0.01*500000;
      setRows((prev)=>([...prev,{
        amounto:500000,
        rateo:0.01,
        taxo:5000
      }]))
      if(inter>200000){
        inter=inter-200000;
        tax1+=0.1*200000;
        setRows((prev)=>([...prev,{
          amounto:200000,
          rateo:0.1,
          taxo:20000
        }]))

        if(inter>300000){
          inter=inter-300000;
          tax1+=0.2*300000;
          setRows((prev)=>([...prev,{
            amounto:300000,
            rateo:0.2,
            taxo:60000
          }]))
          if(inter>1000000){
            inter=inter-1000000;
            tax1+=0.3*1000000;
            setRows((prev)=>([...prev,{
              amounto:1000000,
              rateo:0.3,
              taxo:300000
            }]))
            if(inter>500000){
              tax1+=0.5*inter;
              setRows((prev)=>([...prev,{
                amounto:inter,
                rateo:0.5,
                taxo:0.5*inter
              }]))
            }else{
              tax1+=0.36*inter;
              setRows((prev)=>([...prev,{
                amounto:inter,
                rateo:0.36,
                taxo:0.36*inter
              }]))
            }
          }else{
            tax1+=0.3*inter;
            setRows((prev)=>([...prev,{
              amounto:inter,
              rateo:0.3,
              taxo:0.3*inter
            }]))
          }
        }
        else{
          tax1+=0.2*inter;
          setRows((prev)=>([...prev,{
            amounto:inter,
            rateo:0.2,
            taxo:0.2*inter
          }]))
        }
      }else{
        tax1+=0.1*inter;
        setRows((prev)=>([...prev,{
          amounto:inter,
          rateo:0.1,
          taxo:0.1*inter
        }]))
      }
    }else{
 
      tax1+=0.01*ai;
      setRows((prev)=>([...prev,{
        amounto:ai,
        rateo:0.01,
        taxo:0.01*ai
      }]))  

    }
    setTax(tax1)
    
  }
  console.log(rows.length);
  function hello(event){
    event.preventDefault();
    window.print();
  }
  // useEffect(()=>{ 
  //   setTimeout(()=>{taxCalc()},100);
  
  // },[formData.AI]);
  function closing(){
    setRows([]);
  }
  return (
    <>
    <Header />
    <div className="box1">
      <form className="form1">
      <div className="box2">
        <div className="fx-1">
        <label>Nature of Employee: </label>
        <select id="natureOfEmployee"  name="natureOfEmployee" onChange={setData}>
          <option value="unmarried">Unmarried</option>
          <option value="married">Married</option>
        </select>
        </div>
        <div className="fx-1">
        <label>Fiscal Year: </label>
        <input type="date" onChange={setData} name="noOfMonths" id="noOfMonths"></input>
        </div>
      </div>
      <div className="box3">
        <div className="box3-1">
          <p>Annual income</p>
          <label>Monthly Salary</label><br></br>
          <input type="number" id="monthlySalary" name="monthlySalary" 
            onChange={setData}
          ></input><br></br>
          <label>Number of Months</label><br></br>
          <input type="number" id="numberOfMonths" name="numberOfMonths" placeholder="12" onChange={setData}></input><br></br>
          <div className="bonus">
          <label>Bonus</label><br></br>
          <input type="number" id="bonus" name="bonus" onChange={setData}  onMouseOut={totalSalaryCalculation}></input><br></br>
          </div>
          <label >Total Salary</label><br></br>
          <input type="number" id="totalSalary" name="totalSalary" placeholder="0" onClick={totalSalaryCalculation}></input><br></br>
        </div>
        <div className="box3-2">
        <p>Annual Deduction</p>
          <label>Social Security Fund</label><br></br>
          <input type="number" id="socialSecurityFund" name="socialSecurityFund" placeholder="0" onChange={setData}></input><br></br>
          <label>Employees Provident Fund</label><br></br>
          <input type="number" id="employeeProvidentFund" name="employeeProvidentFund" placeholder="0" onChange={setData}></input><br></br>
          <label>Citizen Investment Trust</label><br></br>
          <input type="number" id="citizenInvestmentTrust" name="citizenInvestmentTrust" placeholder="0" onChange={setData}></input><br></br>
          <label>Insurance</label><br></br>
          <input type="number" id="insurance" name="insurance" placeholder="0" onChange={setData}></input><br></br>
        </div>
      </div>
      <div className="box4">
      <button id="resetbutton" onClick={resetData}>Reset value</button>
      <Dialog className="dialog" open={open} onOpenChange={setOpen}> 

      <DialogTrigger asChild >
      <button id="calcualtebutton"
 variant="outline" onClick={calculateData}>calculate</button>
        </DialogTrigger>
  
  <DialogContent className="dialog-content">
    <DialogHeader>
      <DialogTitle className="he">Net Tax Liability</DialogTitle>

      </DialogHeader>
      <DialogDescription>
      <div className="dialogdiv">
      <div type="text" id="monthly" name="monthly" value={(parseFloat(tax)/12).toFixed(3)}>Rs. {(parseFloat(tax)/12).toFixed(3)} (Monthly)</div>
      <div type="text" id="yearly" name="yearly" value={parseFloat(tax)}>Rs. {tax} (Yearly)</div>
      <br></br>
      </div>
        <div className="dbox1">
          <div className="dbox1-1"><div>Total income (Ti): </div>
            <div className="dinput" id="Ti" name="Ti" value={finalData.TI}> Rs. {finalData.TI}</div>
          </div>
          <div className="dbox1-1">
            <div>Sum of SSF, EPF and CIT (SSF+EPF+CIT): </div>
            <div className="dinput" id="ssf" name="ssf">Rs. {finalData.SSF}</div>
          </div>
          <div className="dbox1-1">
          <div>Insurance: </div>
          <div className="dinput" id="ins" name="ins">Rs. {finalData.INS}</div>
          </div>
          <div className="dbox1-1">
          <div>Total Deduction (TD): </div>
          <div className="dinput" id="TD" name="TD">Rs. {finalData.TD}</div>
          </div>
          <div className="dbox1-1">
          <div>Net Assessable (TI-TD): </div>
          <div className="dinput" id="NA" name="Na">Rs. {finalData.NA}</div>
          </div>
        </div>
        <div className="dbox2">
          <table id="dialogTable"> 
            <thead>
            <tr className="headings">
              <th>
                Assesible Income (Rs.)  
              </th>
              <th>Rate(%)</th>
              <th>Tax Liability(Rs.)</th>
            </tr>
            </thead>
            <tbody>
              {rows.map((item)=>(
                <tr>
                  <td>
                    {item.amounto}
                  </td>
                  <td>
                    {item.rateo}
                  </td>
                  <td>
                    {item.taxo}
                  </td>
                </tr>
              ))}
              <tr className="finalRow">
                <td className="hhh">
                  {finalData.AI}
                </td>
                <td className="hhh">
                  {tax}
                </td>
                <td></td>

              </tr>
              <tr className="finn">
                <td>Net tax Liability(Monthly): </td>
                <td>
                  Rs. {(parseFloat(tax)/12).toFixed(3)}
                </td>
                <td></td>
              </tr>
              <tr  className="finn">
              <td>Net tax Liability(Yearly): </td>
                <td>
                  Rs. {tax}
                </td>
              </tr>
            </tbody>
            
          </table>
        </div>
      </DialogDescription>
      <DialogFooter>
    <button class="printme" onClick={hello}>Print</button>
    <DialogClose asChild>
      <button className="clos"onClick={
        closing
      }>close</button>
    </DialogClose>
  </DialogFooter>
  </DialogContent>
  
</Dialog>
      </div>
      </form>
    </div>
    <div>
      <p className="info">
      Salary tax calculator is designed for calculating tax payable to Nepal government on the salary earned in a given year. The calculation is based on Nepal Government Tax Policy.
        <br></br>
      If you have any feedback and suggestion, please write to <span className="mail" onClick={()=>{router.push("mailto:info@eattendance.com")}}>info@eattendance.com</span> or call 9851190654.
      </p>
    </div>
    <Footer />
</>
      );
}
