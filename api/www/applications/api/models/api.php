<?php
/**
 * Access from index.php:
 */
if(!defined("_access")) {
	die("Error: You don't have permission to access here...");
}

class Api_Model extends ZP_Model {
	
	public function __construct() {
		$this->Db = $this->db();
		$this->cityId = 1;
		$this->helpers();
		$this->options = null;
		$this->dataCity = null;
		$this->Area_Infraestructura = 0;
	}
	
	public function getDataCity($cityId = false) {
		if($cityId == false) $cityId = $this->cityId;
		
		$query	 = "SELECT * from dataset";
		$query  .= " where id_city=".$cityId;
		$data	 = $this->Db->query($query);
		
		if(!$data and !is_array($data)) return false;
		
		return $data[0];
	}
	
	public function getResults($options) {
		$this->options = $options;
		$this->dataCity = $this->getDataCity();
		$this->Area_Infraestructura = $this->options["KmEvaluables"]*$this->options["Sentidos"]*1000;
		
		$data["areaInfraestructura"] = $this->Area_Infraestructura;
		$data["bacheo"] = $this->getBacheo();
		$data["interseccionesSemaforizadas"] = $this->dataCity["interssemafor"]*$this->options["IntersSemaf"];
		$data["delimitacionInfraestructura"] = $this->getDelimitacionInfraestructura();
		$data["senalizacion"] = $this->getSenalizacion();
		$data["infraestructuraComplementaria"] = $this->getInfresComplementaria();
		$data["biciestacionamientos"] = $this->getBiciestacionamientos();
		$data["options"] = $this->options;
		
		return $data;
	}
	
	/*Costo de Biciestacionamientos*/
	public function getBiciestacionamientos() {
		if($this->options["Biciestacionamientos"] == "default") {
			/*
			 * BiciestacionamientosInput = Default 
			 * ((KmEvaluables*1000)/300)*4*Biciestacionamientos
			*/ 
			$result = (($this->options["KmEvaluables"]*100)/300)*4*$this->dataCity["biciestacionamientos"];
			return $result;
		} else {
			/*
			* BiciestacionamientosInput = Biciestacionamientos*ImputBiciEst
			*/
			$result = $this->options["Biciestacionamientos"]*$this->dataCity["biciestacionamientos"];
			return $result;
		}
		
		return 0;
	}
	
	/*Costo infraestructura complementaria*/
	public function getInfresComplementaria() {
		if($this->options["ObraComp"] == "ObraCompl_Completa") {
			/*
			 * ObraComp = ObraCompl_Completa 
			 * [InputIntersTotales*SeñalHorizComplement*(AnchoCalle/Sentidos)*3*4] + 
			 * [Bolardo*7*4*InputIntersTotales] + 
			 * [GuiasTactiles*3*20] + 
			 * [Banqueta*20]
			 *
			*/
			$result  = $this->options["IntersTotales"]*$this->dataCity["senalhorizcomplement"]*($this->options["AnchoCalle"]/$this->options["Sentidos"])*3*4;
			$result += $this->dataCity["bolardo"]*7*4*$this->options["IntersTotales"];
			$result += $this->dataCity["guiastactiles"]*3*20;
			$result += $this->dataCity["banqueta"]*20;
			
			return $result;
		} elseif($this->options["ObraComp"] == "ObraCompl_Semi") {
			/* 
			 * ObraComp = ObraCompl_Semi 
			 * [InputIntersTotales*SeñalHorizComplement*(AnchoCalle/Sentidos)*3*4] + 
			 * [Bolardo*7*4*InputIntersTotales]
			*/
			$result  = $this->options["IntersTotales"]*$this->dataCity["senalhorizcomplement"]*($this->options["AnchoCalle"]/$this->options["Sentidos"])*3*4;
			$result += $this->dataCity["bolardo"]*7*4*$this->options["IntersTotales"];
			
			return $result;
		} elseif($this->options["ObraComp"] == "ObraCompl_Basica") {
			/* 
			 * ObraComp = ObraCompl_Basica 
			 * [InputIntersTotales*SeñalHorizComplement*(AnchoCalle/Sentidos)*3*4]
			*/
			$result  = $this->options["IntersTotales"]*$this->dataCity["senalhorizcomplement"]*($this->options["AnchoCalle"]/$this->options["Sentidos"])*3*4;
			
			return $result;
		}
		
		return 0;
		
		
	}
	
	/*Costo de señalización*/
	public function getSenalizacion() {
		/*
		 * Costo de señalización vertical
		 * (InputIntersSamaf * IntersSemafor) + 
		 * [ (InputIntersTotales*SeñalVertPreventiva) + 
		 * (InputIntersTotales*SeñalVertRestrictiva) ] 
		*/
		
		/*
		 * Costo de señalización horizontal
		 * (InputIntersTotales*SeñalHorizSOLO*Sentidos) + (SeñalHorizPintVerde*Sentidos*KmEvaluables*100)
		*/
		$vertical  = $this->options["IntersSemaf"]*$this->dataCity["interssemafor"];
		$vertical += $this->options["IntersTotales"]*$this->dataCity["senalvertpreventiva"];
		$vertical += $this->options["IntersTotales"]*$this->dataCity["senalvertrestrictiva"];
		
		$horizontal  = $this->options["IntersTotales"]*$this->dataCity["senalhorizsolo"]*$this->options["Sentidos"];
		$horizontal += $this->dataCity["senalhorizpintverde"]*$this->options["Sentidos"]*$this->options["KmEvaluables"]*100;
		
		$result["vertical"] = $vertical;
		$result["horizontal"] = $horizontal;
		
		if($this->options["senalizacion"] == "MinSenalHor") {
			$result["seleccionada"] = $horizontal;
			$result["vertical"]	    = 0;
		} else {
			$result["seleccionada"] = $horizontal+$vertical;
		}
		
		return $result;
	}
	
	/*Costo de la delimitación de la infraestructura*/
	public function getDelimitacionInfraestructura() {
		if($this->options["infraestructura"] == "Ciclovia") {
			if($this->options["AnchoCalle"] < 6) {
				/*
				TipoInfraUtilizado = Conf_Chapu 
				{KmEvaluables*2*Sentidos*PinturaDelimitacion*1000} + {KmEvaluables*Sentidos*Conf_Chapu*250}
				 */
				$result  = $this->options["KmEvaluables"]*2*$this->options["Sentidos"]*$this->dataCity["pinturadelimitacion"]*1000;
				$result += $this->options["KmEvaluables"]*$this->options["Sentidos"]*$this->dataCity["conf_chapu"]*250;
				
				return $result;
			} else {
				/*
				TipoInfraUtilizado = Conf_Reforma 
				* {KmEvaluables*2*Sentidos*PinturaDelimitacion*1000} + {KmEvaluables*Sentidos*Conf_Reforma*250}
				*/
				$result  = $this->options["KmEvaluables"]*2*$this->options["Sentidos"]*$this->dataCity["pinturadelimitacion"]*1000;
				$result += $this->options["KmEvaluables"]*$this->options["Sentidos"]*$this->dataCity["conf_reforma"]*250;
				
				return $result;
			}
		} elseif($this->options["infraestructura"] == "Ciclocarril") {
			/*Confinamiento = Ciclocarril {KmEvaluables*2*Sentidos*PinturaDelimitacion*1000}*/
			$result  = $this->options["KmEvaluables"]*2*$this->options["Sentidos"]*$this->dataCity["pinturadelimitacion"]*1000;
			
			return $result;
		} elseif($this->options["infraestructura"] == "Busbici") {
			/*Confinamiento = Carril Bus-Bici {KmEvaluables*2*Sentidos*PinturaDelimitacion*1000} + {KmEvaluables*Sentidos*Conf_Chapu*250}*/
			$result  = $this->options["KmEvaluables"]*2*$this->options["Sentidos"]*$this->dataCity["pinturadelimitacion"]*1000;
			$result += $this->options["KmEvaluables"]*$this->options["Sentidos"]*$this->dataCity["conf_chapu"]*250;
			
			return $result;
		}
		
		return 0;
	}
	
	/*Costo de obras viales de bacheo*/
	public function getBacheo() {
		if($this->options["TipoDeBacheo"] == "Slurry") {
			/*
			BacheoSlurry = Slurry*AreaInfraestructura
			*/
		} elseif($this->options["TipoDeBacheo"] == "BacheoSuperficial") {
			/*
			BacheoSuperficial = 
			* [OV_Tra_Niv*Area_Infraestructura] + 
			* [FUBS*PUBS*Area_Infraestructura] + 
			* [OV_Acarreo*KmEvaluables] + 
			* [OV_Sumin*Area_Infraestructura] + 
			* [RejillasProyecto*SumInstalRejilla*KmEvaluables*Sentidos] + 
			* [DemolManua*KmEvaluables*Sentidos] + 
			* [CargaM3*56]+
			* [RejillasProyecto*RenivColadera] + 
			* [PozosProyecto*RenivBrocPozo] + 
			* [LevantPoligonal*Area_Infraestructura]
			*/
			
			$bacheo  = ($this->dataCity["ov_tra_niv"]*$this->Area_Infraestructura);
			$bacheo += ($this->dataCity["factorunitariobacheosuperficial"]*$this->dataCity["preciounitariobacheosuperficial"]*$this->Area_Infraestructura);
			$bacheo += ($this->dataCity["ov_acarreo"]*$this->options["KmEvaluables"]);
			$bacheo += ($this->dataCity["ov_sumin"]*$this->Area_Infraestructura);
			$bacheo += ($this->options["RejillasProyecto"]*$this->dataCity["suminstalrejilla"]*$this->options["KmEvaluables"]*$this->options["Sentidos"]);
			$bacheo += ($this->dataCity["demolmanual"]*$this->options["KmEvaluables"]*$this->options["Sentidos"]);
			$bacheo += ($this->dataCity["cargam3"]*56);
			$bacheo += ($this->options["RejillasProyecto"]*$this->dataCity["renivcoladera"]);
			$bacheo += ($this->options["PozosProyecto"]*$this->dataCity["renivbrocpozo"]);
			$bacheo += ($this->dataCity["levantpoligonal"]*$this->Area_Infraestructura);
			
			return $bacheo;
		} elseif($this->options["TipoDeBacheo"] == "BacheoProfundo") {
			/*
			BacheoProfundo = 
			[OV_Tra_Niv*Area_Infraestructura] + 
			[FUBP*PUBP*Area_Infraestructura] + 
			[OV_Acarreo*KmEvaluables] + 
			[OV_Sumin*Area_Infraestructura] +
			[RejillasProyecto*SumInstalRejilla*KmEvaluables*Sentidos] + 
			[DemolManua*KmEvaluables*Sentidos] + 
			[CargaM3*56]+
			[RejillasProyecto*RenivColadera] + 
			[PozosProyecto*RenivBrocPozo] + 
			[LevantPoligonal*Area_Infraestructura]
			*/
			$bacheo  = ($this->dataCity["ov_tra_niv"]*$this->Area_Infraestructura);
			$bacheo += ($this->dataCity["factorunitariobacheoprofundo"]*$this->dataCity["preciounitariobacheoprofundo"]*$this->Area_Infraestructura);
			$bacheo += ($this->dataCity["ov_acarreo"]*$this->options["KmEvaluables"]);
			$bacheo += ($this->dataCity["ov_sumin"]*$this->Area_Infraestructura);
			$bacheo += ($this->options["RejillasProyecto"]*$this->dataCity["suminstalrejilla"]*$this->options["KmEvaluables"]*$this->options["Sentidos"]);
			$bacheo += ($this->dataCity["demolmanual"]*$this->options["KmEvaluables"]*$this->options["Sentidos"]);
			$bacheo += ($this->dataCity["cargam3"]*56);
			$bacheo += ($this->options["RejillasProyecto"]*$this->dataCity["renivcoladera"]);
			$bacheo += ($this->options["PozosProyecto"]*$this->dataCity["renivbrocpozo"]);
			$bacheo += ($this->dataCity["levantpoligonal"]*$this->Area_Infraestructura);
			
			return $bacheo;
		} elseif($this->options["TipoDeBacheo"] == "BacheoPromedio") {
			/*
			BacheoPromedio = 
			* [OV_Tra_Niv*Area_Infraestructura] + 
			* [FUBPr*PUBPr*Area_Infraestructura] + 
			* [OV_Acarreo*KmEvaluables] + 
			* [OV_Sumin*Area_Infraestructura] + 
			* [RejillasProyecto*SumInstalRejilla*KmEvaluables*Sentidos] + 
			* [DemolManua*KmEvaluables*Sentidos] + 
			* [CargaM3*56]+
			* [RejillasProyecto*RenivColadera] + 
			* [PozosProyecto*RenivBrocPozo] + 
			* [LevantPoligonal*Area_Infraestructura] 
			*/
			$bacheo  = ($this->dataCity["ov_tra_niv"]*$this->Area_Infraestructura);
			$bacheo += ($this->dataCity["factorunitariobacheopromedio"]*$this->dataCity["preciounitariobacheopromedio"]*$this->Area_Infraestructura);
			$bacheo += ($this->dataCity["ov_acarreo"]*$this->options["KmEvaluables"]);
			$bacheo += ($this->dataCity["ov_sumin"]*$this->Area_Infraestructura);
			$bacheo += ($this->options["RejillasProyecto"]*$this->dataCity["suminstalrejilla"]*$this->options["KmEvaluables"]*$this->options["Sentidos"]);
			$bacheo += ($this->dataCity["demolmanual"]*$this->options["KmEvaluables"]*$this->options["Sentidos"]);
			$bacheo += ($this->dataCity["cargam3"]*56);
			$bacheo += ($this->options["RejillasProyecto"]*$this->dataCity["renivcoladera"]);
			$bacheo += ($this->options["PozosProyecto"]*$this->dataCity["renivbrocpozo"]);
			$bacheo += ($this->dataCity["levantpoligonal"]*$this->Area_Infraestructura);
			
			return $bacheo;
		}
		
		return 0;
	}
	
	public function getCities() {
		$query = "SELECT * from cities";
		$data  = $this->Db->query($query);
		
		if(!$data) return false;
		
		return $data;
	}
}