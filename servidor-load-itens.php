<?php


    include '<arquivo de conexão PDO>';


    $result = array();

    $myfile = fopen("ctrl.txt", "r") or die("Unable to open file!");
    $ctrl = fread($myfile,filesize("ctrl.txt"));
    fclose($myfile);

    $ctrl = intval($ctrl);
    $limite = 5;

    if($ctrl > $limite){

        $result['finalizado'] = 'ok';       
        $result =  json_encode($result);
        echo $result;
  
        exit;
    }

    $sql = "SELECT * from noticias where id<=376 ORDER BY id DESC limit ".$ctrl.",".$limite;
    //$sql = "SELECT * from noticias where id=386";
    //echo $sql;

    $myfile = fopen("ctrl.txt", "w") or die("Unable to open file!");
    fwrite($myfile, ($ctrl+1));
    fclose($myfile);
    //exit;

    $p_sql = ConexaoCentral::getInstance()->prepare($sql);
    $p_sql->execute();
    $dados= $p_sql->fetchAll(PDO::FETCH_ASSOC);
    //echo sizeof($dados);
    // echo "<pre>";
    // var_dump($dados);
    // echo "</pre>";
    //exit;
    foreach ($dados as $key => $noticia) {

        $sqlm = "SELECT * FROM midias_noticias mn inner join midias m on m.id = mn.midia_id where mn.noticia_id = ".$noticia["id"]." order by mn.id desc";

        $p_sqlm = ConexaoCentral::getInstance()->prepare($sqlm);
        $p_sqlm->execute();
        $midias = $p_sqlm->fetchAll(PDO::FETCH_ASSOC);

        $dataaux = explode(" ",$noticia["created_at"]);   
        $hora = $dataaux[1];     
        $dataaux = explode("-",$dataaux[0]);        
        //$dataaux[2]."/".$dataaux[1]."/".$dataaux[0]
        $result[$key] = [            
            "id" => $noticia["id"],
            "titulo" => $noticia["titulo"],
            "created_at" => $dataaux[2]."/".$dataaux[1]."/".$dataaux[0]." ".$hora,
            "data" => $dataaux[2]."/".$dataaux[1]."/".$dataaux[0],
            "conteudo" => $noticia["conteudo"],
            "imagens" => $midias,
        ];        
    }

    // echo "<pre>";
    //     var_dump($result);
    // echo "</pre>";
    // echo "<hr>";

    //var_dump($markers);
    $result =  json_encode($result);       

 
    echo $result;
  
?>
