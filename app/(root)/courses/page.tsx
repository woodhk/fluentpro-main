"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Lock, ChevronRight, GripVertical } from 'lucide-react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';

interface Task {
  id: string;
  title: string;
  description: string;
}

// -------------- MODAL COMPONENTS --------------
/**
 * A simple reusable Modal container.
 */
const Modal = ({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50">
      <div className="relative bg-white w-full max-w-md rounded-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

/**
 * Popup/modal for Course Effectiveness.
 */
const CourseEffectivenessModal = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Course Effectiveness</h2>
      <p className="text-gray-700">
        Here you could display statistics, testimonials, or any other
        information about how effective this course is.
      </p>
    </Modal>
  );
};

/**
 * Popup/modal for Key Language.
 */
const KeyLanguageModal = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Key Language</h2>
      <p className="text-gray-700">
        This modal might include important terms, vocabulary, or phrases
        students will encounter in this course.
      </p>
    </Modal>
  );
};
// --------------------------------------------


// Initial selection card component
const TaskCard = ({
  task,
  isSelectable,
  onSelect,
  isSelected
}: {
  task: Task;
  isSelectable: boolean;
  onSelect: () => void;
  isSelected: boolean;
}) => {
  // Keep track of which modal (if any) is open.
  const [openModal, setOpenModal] = useState<'' | 'effectiveness' | 'language'>('');

  /**
   * Stop click events from bubbling up to the card.
   * This prevents the card from being "selected" when a button is clicked.
   */
  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`
        bg-white rounded-xl border p-6 transform transition-all duration-300
        ${isSelectable ? 'cursor-pointer hover:shadow-md hover:scale-[1.01]' : 'opacity-50'}
        ${isSelected ? 'ring-2 ring-blue-500 shadow-md' : 'shadow-sm'}
      `}
      onClick={() => isSelectable && onSelect()}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
          </div>
        </div>

        <p className="text-gray-600">{task.description}</p>

        {/* --------------- NEW BUTTONS --------------- */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={(e) => {
              handleStopPropagation(e);
              setOpenModal('effectiveness');
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Course Effectiveness
          </button>
          <button
            onClick={(e) => {
              handleStopPropagation(e);
              setOpenModal('language');
            }}
            className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Key Language
          </button>
        </div>
        {/* ------------------------------------------ */}

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            {isSelected ? (
              <span className="text-blue-600">Selected as starting point</span>
            ) : isSelectable ? (
              <span>Click to select as starting point</span>
            ) : (
              <span>Locked</span>
            )}
          </div>
        </div>
      </div>

      {/* Conditionally render the modals */}
      {openModal === 'effectiveness' && (
        <CourseEffectivenessModal onClose={() => setOpenModal('')} />
      )}
      {openModal === 'language' && (
        <KeyLanguageModal onClose={() => setOpenModal('')} />
      )}
    </div>
  );
};

// Sortable task component
const SortableTask = ({
  task,
  isActive,
  onContinue
}: {
  task: Task;
  isActive: boolean;
  onContinue: () => void;
}) => {
  // Similar approach to open modals in the sortable tasks
  const [openModal, setOpenModal] = useState<'' | 'effectiveness' | 'language'>('');

  // Handle drag & drop logic from dnd-kit
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    disabled: isActive
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0
  };

  /**
   * Stop click events from bubbling up to the card
   * so the user doesn’t unintentionally drag or trigger other actions
   */
  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        bg-white rounded-xl border shadow-sm p-6 transform transition-all duration-300 
        ${isDragging ? 'shadow-lg' : 'shadow-sm hover:shadow-md hover:scale-[1.01]'}
        ${isActive ? 'ring-2 ring-blue-500' : ''}
      `}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">
              {isActive ? 'Active Task' : 'Upcoming'}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
          </div>

          {isActive && (
            <button
              onClick={onContinue}
              className="text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>

        <p className="text-gray-600">{task.description}</p>

        {/* --------------- NEW BUTTONS --------------- */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={(e) => {
              handleStopPropagation(e);
              setOpenModal('effectiveness');
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Course Effectiveness
          </button>
          <button
            onClick={(e) => {
              handleStopPropagation(e);
              setOpenModal('language');
            }}
            className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Key Language
          </button>
        </div>
        {/* ------------------------------------------ */}

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {isActive ? (
              <span className="text-blue-600">Currently Active</span>
            ) : (
              <span>Locked - Drag to reorder priority</span>
            )}
          </div>

          {!isActive && (
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <GripVertical className="h-5 w-5 text-gray-400" />
            </div>
          )}
        </div>
      </div>

      {/* Conditionally render the modals */}
      {openModal === 'effectiveness' && (
        <CourseEffectivenessModal onClose={() => setOpenModal('')} />
      )}
      {openModal === 'language' && (
        <KeyLanguageModal onClose={() => setOpenModal('')} />
      )}
    </div>
  );
};

const TaskManagementPage = () => {
  const router = useRouter();
  const [hasSelectedFirst, setHasSelectedFirst] = useState(false);
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Course 1',
      description: 'Learn to write clear and effective professional emails'
    },
    {
      id: '2',
      title: 'Course 2',
      description: 'Master the basics of business documentation and reports'
    },
    {
      id: '3',
      title: 'Course 3',
      description: 'Understanding professional communication protocols'
    }
  ]);

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const taskToMove = tasks.find(task => task.id === active.id);
    if (!taskToMove || taskToMove.id === activeTaskId) return;

    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex(task => task.id === active.id);
      const newIndex = tasks.findIndex(task => task.id === over.id);

      const newTasks = [...tasks];
      const [movedItem] = newTasks.splice(oldIndex, 1);
      newTasks.splice(newIndex, 0, movedItem);

      // Update tasks order logic here, if needed
    }
  };

  const handleTaskSelect = (taskId: string) => {
    setActiveTaskId(taskId);
    setHasSelectedFirst(true);
  };

  const handleContinue = () => {
    router.push('/modules');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Courses
          </h2>
          {hasSelectedFirst && (
            <div className="flex items-center gap-2 bg-blue-50 text-blue-600 rounded-lg px-4 py-2 font-medium">
              {tasks.length - 1} Courses Remaining
            </div>
          )}
        </div>

        {!hasSelectedFirst ? (
          // Initial selection screen
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <p className="text-blue-800">
                Select the task you'd like to start with. The remaining tasks will be locked and can be reordered based on your priority.
              </p>
            </div>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                isSelectable={true}
                onSelect={() => handleTaskSelect(task.id)}
                isSelected={task.id === activeTaskId}
              />
            ))}
            {activeTaskId && (
              <div className="flex justify-end">
                <button
                  onClick={() => setHasSelectedFirst(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Confirm Selection
                </button>
              </div>
            )}
          </div>
        ) : (
          // Task management screen
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={tasks.map(task => task.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-6">
                {tasks.map((task) => (
                  <SortableTask
                    key={task.id}
                    task={task}
                    isActive={task.id === activeTaskId}
                    onContinue={handleContinue}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TaskManagementPage;
