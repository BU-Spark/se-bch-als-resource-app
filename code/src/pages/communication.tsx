import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Head from 'next/head';
import Title from '../components/Title/Titles';
import {
    IQuestion,
    IChoice,
    IBodyContent,
    ISolution,
  } from "../types/api_types";

const CommunicationPage: React.FC = () => {

    const prevSelectedContent = useRef<IBodyContent[]>([]);
    const heroImage = useRef("/titleimghome.PNG");
    const pageTitle = useRef("Communication");
  
    return (
        <div>
        <Head>
                <title>{pageTitle.current}</title>
            </Head>
        <Title
          hasPrev={true} 
          titleImg={heroImage.current}
          title={pageTitle.current}
        />
        </div>
    );
};

export default CommunicationPage;