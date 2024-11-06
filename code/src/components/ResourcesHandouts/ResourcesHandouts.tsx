import React, { useState } from "react";
import { useRouter } from "next/router";
import { IconFileDescription } from "@tabler/icons-react";
import { Stack, Text, Button, Modal } from "@mantine/core";
import { ResourceLink } from "@/types/dataTypes";
import BookmarkButton from "@/components/BookmarkButton/BookmarkButton";
import { useFocusedBookmark } from "@/contexts/FocusedBookmarkContext";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { useStyles } from "@/components/ResourcesHandouts/ResourcesHandoutsStyle";

interface ResourcesProps {
 title: String;
 data: ResourceLink[];
 onUnsave?: (bookmarkId: string) => void;
 currentFolderId?: string;
}

const Resources: React.FC<ResourcesProps> = ({
 title,
 data,
 onUnsave,
 currentFolderId
}) => {
 const { classes } = useStyles();
 const { setFocusedBookmark } = useFocusedBookmark();
 const { folders, addBookmark, removeBookmark } = useBookmarks();
 const router = useRouter();
 const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
 const [selectedBookmark, setSelectedBookmark] = useState<ResourceLink | null>(null);

 const handleBookmarkClick = (bookmark: ResourceLink) => {
   setFocusedBookmark(bookmark);
   router.push("/communication");
 };

 const handleMoveClick = (bookmark: ResourceLink) => {
   setSelectedBookmark(bookmark);
   setIsMoveModalOpen(true);
 };

 const handleMove = (folderId: string) => {
   if (selectedBookmark) {
     removeBookmark(selectedBookmark.id);
     addBookmark(selectedBookmark, folderId);
     setIsMoveModalOpen(false);
     setSelectedBookmark(null);
   }
 };

 return (
   <div>
     <Stack spacing="xl">
       <Text className={classes.text}> {title} </Text>
       {data.map((resource, index) => (
         <div className={classes.linkContainer} key={index}>
           <div className={classes.resourceButtonContainer}>
             <Button
               key={resource.id}
               className={classes.inner}
               variant="outline"
               leftIcon={<IconFileDescription color="#254885" />}
               component="a"
               target="_blank"
               onClick={() => handleBookmarkClick(resource)}
             >
               {resource.title}
             </Button>
           </div>
           <div className={classes.bookmarkButtonContainer}>
             {onUnsave && (
               <>
                 <Button
                   className={`${classes.inner} ${classes.actionButton}`}
                   variant="outline"
                   onClick={() => onUnsave(resource.id)}
                 >
                   <Text fz="xl">Unsave</Text>
                 </Button>
                 <Button
                   className={`${classes.inner} ${classes.actionButton}`}
                   variant="outline"
                   onClick={() => handleMoveClick(resource)}
                 >
                   <Text fz="xl">Move</Text>
                 </Button>
               </>
             )}
           </div>
         </div>
       ))}
     </Stack>

     <Modal
       opened={isMoveModalOpen}
       onClose={() => {
         setIsMoveModalOpen(false);
         setSelectedBookmark(null);
       }}
       title="Move to Folder"
       size="md"
     >
       <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
         {currentFolderId !== 'default' && (
           <Button
             className={classes.inner}
             variant="light"
             onClick={() => handleMove('default')}
           >
             <Text>Move to Default Folder</Text>
           </Button>
         )}
         {folders
           .filter(folder => folder.id !== currentFolderId)
           .map(folder => (
             <Button
               key={folder.id}
               className={classes.inner}
               variant="light"
               onClick={() => handleMove(folder.id)}
             >
               <Text>Move to &quot;{folder.name}&quot;</Text>
             </Button>
           ))}
       </div>
     </Modal>
   </div>
 );
};

export default Resources;